const getUserProfile = async (id) => {
    try {
        const result = await DataSource.getUserById(id);

        renderDetail(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const updateUserProfile = async () => {
    var formData = new FormData();
    formData.append('Id', JWTUserID);
    formData.append('Firstname', $('#first-name').val());
    formData.append('Lastname', $('#last-name').val());
    formData.append('PhoneNumber', $('#phone-number').val());
    formData.append('Website', $('#website').val());
    formData.append('Address', $('textarea#address').val());
    formData.append('City', $('#city').val());
    formData.append('PostalCode', $('#postal-code').val());
    formData.append('State', $('#state').val());
    formData.append('CountryId', $('#country_id').val());
    formData.append('PictureFile', $('#profilePicture')[0].files[0]);

    try {
        DataSource.updateUsers(JWTUserID, formData);

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Organizer has been added',
            showConfirmButton: true,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/user/profile';
            }
        });
    } catch (message) {
        alert(message);
    }
};

const renderDetail = (result) => {
    const profile = result.data;

    $('#email').val(profile.email);
    $('#first-name').val(profile.firstname);
    $('#last-name').val(profile.lastname);
    $('#phone-number').val(profile.phoneNumber);
    $('#website').val(profile.website);
    $('textarea#address').val(profile.address);
    $('#city').val(profile.city);
    $('#postal-code').val(profile.postalCode);
    $('#country_id').val(profile.countryId).trigger('change');
    $('#state').val(profile.state);
};

const fallbackResult = (message) => {
    alert(message);
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
                    await updateUserProfile();
                }

                form.classList.add('was-validated');
            },
            false
        );
    });

    $('.basic-select-country').select2({
        placeholder: 'Select Country',
        ajax: {
            url: `${BASE_URL_API}/api/countries`,
            dataType: 'json',
            data: function (params) {
                return {
                    search: params.term,
                };
            },
            processResults: function (data) {
                return {
                    results: data.data.map((country) => {
                        return {
                            id: country.id,
                            text: country.name,
                        };
                    }),
                };
            },
            cache: true,
        },
    });
};

const main = () => {
    events();
    getUserProfile(JWTUserID);
};

main();
