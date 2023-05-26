const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
};

const checkPassword = () => {
    return $('#password').val() === $('#password_confirmation').val();
};

const registerUser = async () => {
    if (!validatePassword($('#password').val())) {
        $('#error').html(`
            <div class="alert alert-danger" role="alert">
                Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number
            </div>
        `);
        return;
    }

    if (!checkPassword()) {
        $('#error').html(`
            <div class="alert alert-danger" role="alert">
                Password and password confirmation must be the same
            </div>
        `);
        return;
    }

    var formData = new FormData();
    formData.append('firstName', $('#first_name').val());
    formData.append('lastName', $('#last_name').val());
    formData.append('email', $('#email').val());
    formData.append('password', $('#password').val());
    formData.append('phoneNumber', $('#phone_number').val());
    formData.append('city', '-');
    formData.append('role', parseInt($('#role').val()));

    if ($('#role').val() === '3') {
        formData.append('organizerName', $('#organizer_name').val());
        formData.append('organizerDescription', $('#organizer_description').val());
        formData.append('organizerImageFile', $('#organizer_image_file')[0].files[0]);
    }

    try {
        await DataSource.register(formData);

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your account has been created successfully!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/account/register';
            }
        });
    } catch (message) {
        alert(message);
    }
};

const events = () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
            'submit',
            async function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (form.checkValidity() === true) {
                    await registerUser();
                }

                form.classList.add('was-validated');
            },
            false
        );
    });

    $('.basic-select-role').select2({
        placeholder: 'Select Role',
        ajax: {
            url: `${BASE_URL_API}/api/roles`,
            dataType: 'json',
            data: function (params) {
                return {
                    search: params.term,
                };
            },
            processResults: function (data) {
                return {
                    results: data.data.filter((role) => role.id !== 1).map((role) => {
                        return {
                            id: role.id,
                            text: role.name,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $('#role').on('select2:select', function (e) {
        const role = e.params.data.id;
        const organizerName = document.querySelector('#organizer_name');
        const organizerDescription = document.querySelector('#organizer_description');
        const organizerImage = document.querySelector('#organizer_image_file');

        if (role === 3) {
            organizerName.classList.remove('d-none');
            organizerDescription.classList.remove('d-none');
            organizerImage.classList.remove('d-none');

            organizerName.setAttribute('required', '');
            organizerDescription.setAttribute('required', '');
            organizerImage.setAttribute('required', '');
        } else {
            organizerName.classList.add('d-none');
            organizerDescription.classList.add('d-none');
            organizerImage.classList.add('d-none');

            organizerName.removeAttribute('required');
            organizerDescription.removeAttribute('required');
            organizerImage.removeAttribute('required');
        }
    });
};

const main = () => {
    events();
};

main();
