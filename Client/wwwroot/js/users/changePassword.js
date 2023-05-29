const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
};

const changeUserPassword = async () => {
    if (!validatePassword($('#new_password').val())) {
        $('#message').html(`<div class="alert alert-danger" role="alert">Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number</div>`);
        return;
    }

    const oldPassword = $('#old_password').val();
    const newPassword = $('#new_password').val();
    const confirmPassword = $('#confirm_password').val();

    if (newPassword !== confirmPassword) {
        $('#message').html(`<div class="alert alert-danger" role="alert">New password and confirm password are not the same</div>`)
        return;
    }

    const data = {
        userId: JWTUserID,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
    };

    try {
        const result = await DataSource.changePassword(data);

        if (result.status === 400) {
            $('#message').html(`<div class="alert alert-danger" role="alert">Old Password Does not Match!</div>`);
        }

        if (result.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password has been changed',
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.href = '/user/changepassword';
            });
        }
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
                    await changeUserPassword();
                }

                form.classList.add('was-validated');
            },
            false
        );
    });
};

const main = () => {
    events();
};

main();
