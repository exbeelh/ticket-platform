let index = 1;

const addTicket = (type) => {
    $('#tickets').append(`
        <div class="row mt-2 g-2 align-items-stretch" id="ticket_${index}">
            <div class="mb-3 col-md-4">
                <label class="form-label">Ticket Name </label>
                <input type="text" class="form-control" name="ticket_name[]" placeholder="Ticket Name" id="ticket_name_${index}" required="">
                <div class="invalid-feedback">
                    Ticket Name is required field
                </div>
            </div>
            <div class="mb-3 col-md-4">
                <label class="form-label">Ticket Qty </label>
                <input type="text" class="form-control" name="ticket_qty[]" placeholder="Ticket Qty" id="ticket_qty_${index}" required="">
                <div class="invalid-feedback">
                    Ticket Quantity is required field
                </div>
            </div>
            <div class="mb-3 col-md-3">
                <label class="form-label">Ticket Price </label>
                <input type="text" class="form-control ticket_price_${index}" name="ticket_price[]" placeholder="Ticket Price" required="">
                <div class="invalid-feedback">
                    Ticket Price is required field
                </div>
                <small>Buyer total : <span id="total_${index}"></span></small>
            </div>
            <div class="form-group mb-3 col-md-1">
                <button type="button" class="btn btn-light" onclick="removeTicket(${index})"> <i class="fas fa-close pe-0"></i></button>
            </div>
        </div>
    `);

    if (type === 'free') {
        $(`.ticket_price_${index}`).attr('disabled', true);
        $(`.ticket_price_${index}`).val("FREE");
    }

    index++;
};

const removeTicket = (index) => {
    $(`#ticket_${index}`).remove();
};

const insertEvent = async () => {
    let tickets = [];
    $('input[name="ticket_name[]"]').each((index, element) => {
        const name = $(element).val();
        const qty = $('input[name="ticket_qty[]"]').eq(index).val();
        const price = $('input[name="ticket_price[]"]').eq(index).val() == 'FREE' ? 0 : $('input[name="ticket_price[]"]').eq(index).val();
        const type = price === 'FREE' ? 0 : 1;

        tickets.push({
            eventId: 1,
            name: name,
            type: type,
            quantityAvaible: qty,
            quantitySold: 0,
            price: price,
            userId: 1,
        });
    });

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
        tickets: tickets,
    };

    try {
        console.log(event);
        await DataSource.insertEvent(event);

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Event has been added, please wait for admin approval',
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

    $('#tickets').on('keyup', 'input[name="ticket_price[]"]', function () {
        const total = $(this).val() * 0.1;
        $(this).parent().parent().find('span').html(total);
    });
};

const main = () => {
    events();
};

main();
