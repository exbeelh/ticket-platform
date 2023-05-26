const manage = async () => {
    // Get form element
    const form = document.querySelector('form');

    // Add event listener to form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = $('#name').val();
        const description = $('textarea').val();
        const isChecked = form.querySelector('#customCheck1').checked;
        const website = $('#website').val();
        const image = $('#image').val();
        const organizerStatus = form.querySelector('#button-status').checked ? 1 : 0;
        const facebook = $('#facebook-url').val();
        const twitter = $('#twitter-url').val();

        // Create an object with the form data
        const formData = {
            name: name,
            description: description,
            descriptionStatus: isChecked ? 1 : 0,
            link: website,
            status: organizerStatus,
            facebook: facebook,
            twitter: twitter,
            image: image,
            userId: 1
        };

        try {
            DataSource.insertOrganizer(formData);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Event has been added, please wait for admin approval',
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

    });
}

/*const insertEvent = async () => {
    let tickets = [];
    $('input[name="ticket_name[]"]').each((index, element) => {
        const name = $(element).val();
        const qty = $('input[name="ticket_qty[]"]').eq(index).val();
        const price = $('input[name="ticket_price[]"]').eq(index).val() == 'FREE' ? 0 : $('input[name="ticket_price[]"]').eq(index).val();
        const type = price === 'FREE' ? 0 : 1;

        tickets.push({
            name: name,
            type: type,
            quantityAvailable: qty,
            quantitySold: 0,
            price: price,
            userId: JWTUserID,
        });
    });

    var formData = new FormData();
    formData.append('title', $('#title').val());
    formData.append('slug', $('#title').val().toLowerCase().replace(/ /g, '-'));
    formData.append('type', parseInt($('#type').val()));
    formData.append('address', $('#address').val());
    formData.append('link', $('#link').val());
    formData.append('note', $('#note').val());
    formData.append('startDate', $('#start_date').val());
    formData.append('endDate', $('#end_date').val());
    formData.append('startTime', $('#start_time').val() + ':00');
    formData.append('endTime', $('#end_time').val() + ':00');
    formData.append('image', 'default.jpg');
    formData.append('imageFile', $('#customFile')[0].files[0]);
    formData.append('categoryId', parseInt($('#category_id').val()));
    formData.append('description', $('#description').val());
    formData.append('isPublish', $('#is_publish').is(':checked') ? 1 : 0);
    formData.append('userId', JWTUserID);

    tickets.forEach((ticket, index) => {
        formData.append(`tickets[${index}].name`, ticket.name);
        formData.append(`tickets[${index}].type`, ticket.type);
        formData.append(`tickets[${index}].quantityAvailable`, ticket.quantityAvailable);
        formData.append(`tickets[${index}].quantitySold`, ticket.quantitySold);
        formData.append(`tickets[${index}].price`, ticket.price);
        formData.append(`tickets[${index}].userId`, ticket.userId);
    });

    try {
        await DataSource.insertEvent(formData);

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Event has been added, please wait for admin approval',
            showConfirmButton: true,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/event/create';
            }
        });
    } catch (message) {
        alert(message);
    }
};*/

manage();