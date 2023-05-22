const insertEvent = async () => {
    let event = {
        title: $('#title').val(),
        slug: $('#title').val().toLowerCase().replace(/ /g, '-'),
        type: parseInt($('#type').val()),
        address: $('#address').val(),
        link: $('#link').val(),
        note: $('#note').val(),
        startDate: $('#start_date').val(),
        endDate: $('#end_date').val(),
        startTime: $('#start_time').val() + ':00',
        endTime: $('#end_time').val() + ':00',
        image: 'default.jpg',
        categoryId: parseInt($('#category_id').val()),
        description: $('#description').val(),
        isPublish: $('#is_publish').is(':checked') ? 1 : 0,
        userId: 1,
        organizerId: 1,
        statusId: 0,
        views: 1,
    };

    try {
        console.log(event);
        await DataSource.insertEvent(event);
        alert('Event has been added');
        // toastr.success('Event has been added', 'Success');

        // $('#categoryModal').modal('hide');
        // reloadData();
    } catch (message) {
        alert(message);
        // toastr.error(message, 'Oops...');
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
                    console.log('add');
                    await insertEvent();
                }

                form.classList.add('was-validated');
            },
            false
        );
    });

    $('#type').on('select2:select', function (e) {
        const type = e.params.data.id;
        const eventAddress = document.querySelector('#address');
        const eventLink = document.querySelector('#link');
        const eventNote = document.querySelector('#note');
        const online = document.querySelector('.online');
        const offline = document.querySelector('.offline');

        if (type === '1') {
            eventAddress.removeAttribute('required');
            eventLink.setAttribute('required', '');
            eventNote.setAttribute('required', '');
            online.classList.remove('d-none');
            offline.classList.add('d-none');
        } else {
            eventAddress.setAttribute('required', '');
            eventLink.removeAttribute('required');
            eventNote.removeAttribute('required');
            online.classList.add('d-none');
            offline.classList.remove('d-none');
        }
    });

    $('.basic-select-category').select2({
        placeholder: 'Select Category',
        ajax: {
            url: 'https://localhost:7291/api/categories',
            dataType: 'json',
            data: function (params) {
                return {
                    search: params.term,
                };
            },
            processResults: function (data) {
                return {
                    results: data.data.map((category) => {
                        return {
                            id: category.id,
                            text: category.name,
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
};

main();
