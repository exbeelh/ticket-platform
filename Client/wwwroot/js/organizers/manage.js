const getOrganizerProfile = async (id) => {
    try {
        const result = await DataSource.getOrganizerByUserId(id);

        renderDetail(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const updateOrganizer = async () => {
    const isChecked = document.getElementById('descriptionStatus').checked ? 1 : 0;
    const organizerStatus = document.querySelector('#button-status').checked ? 1 : 0;

    var formData = new FormData();
    formData.append('Id', JWTUserID);
    formData.append('Name', $('#name').val());
    formData.append('Description', $('textarea').val());
    formData.append('DescriptionStatus', isChecked);
    formData.append('Link', $('#website').val());
    formData.append('Status', organizerStatus);
    formData.append('Facebook', $('#facebook-url').val());
    formData.append('Twitter', $('#twitter-url').val());
    formData.append('ImageFile', $('#image')[0].files[0]);

    try {
        DataSource.updateOrganizer(JWTUserID, formData);

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Organizer has been updated',
            showConfirmButton: true,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/organizer/manage';
            }
        });
    } catch (message) {
        alert(message);
    }
}

const renderDetail = (result) => {
    const profile = result.data;

    $('#name').val(profile.name);
    $('textarea').val(profile.description);
    $('#website').val(profile.link);
    $('#facebook-url').val(profile.facebook);
    $('#twitter-url').val(profile.twitter);

    if (profile.descriptionStatus == 1) {
        $('#descriptionStatus').prop('checked', true);
    }

    if (profile.status == 1) {
        $('#button-status').prop('checked', true);
    }
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
                    await updateOrganizer();
                }

                form.classList.add('was-validated');
            },
            false
        );
    });
};

const main = () => {
    events();
    getOrganizerProfile(JWTUserID);
};

main();
