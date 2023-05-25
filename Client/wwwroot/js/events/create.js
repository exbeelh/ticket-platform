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
            url: `${BASE_URL_API}/api/categories`,
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
