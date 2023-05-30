const getBookingByTransactionId = async (transactionId) => {
    try {
        const result = await DataSource.getBookingByTransactionId(transactionId);
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const getOrganizer = async (id) => {
    try {
        const result = await DataSource.getOrganizerById(id);

        return result.data;
    } catch (message) {
        alert(message);
    }
};

const saveBooking = async (attendees) => {
    try {
        const result = await DataSource.saveBooking(attendees);

        if(result.code === 400) {
            alert(result.message);
            return;
        }

        return result.data;
    } catch (message) {
        alert(message);
    }
};

const cancelOrder = async (id, transactionId) => {
    try {
        const result = await DataSource.cancelOrder(id);

        if(result.code === 400) {
            alert(result.message);
            return;
        }

        Swal.fire({
            title: 'Success',
            text: 'Order has been cancelled',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/order/cancel/' + transactionId;
            }
        });
    } catch (message) {
        alert(message);
    }
};

const renderResult = (result) => {
    let data = result.data;

    // Event
    let event = data.event;
    let eventDateStart = new Date(event.startDate);
    let eventMonthStart = eventDateStart.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
    let eventDateEnd = new Date(event.endDate);
    let eventMonthEnd = eventDateEnd.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

    $('#event_title').text(event.title);
    $('#event_datetime').text(eventMonthStart + ', ' + event.startTime + ' - ' + eventMonthEnd + ', ' + event.endTime);
    $('#event_link').text(event.link);
    $('#event_note').text(event.note);
    $('#event_address').text(event.address);

    // User
    let user = data.user;
    $('#user_firstname').text(user.firstname);
    $('#user_lastname').text(user.lastname);
    $('#user_email').text(user.email);

    // Organizer
    getOrganizer(event.organizerId).then((organizer) => {
        $('#organizer_name').text(organizer.name);
        $('#organizer_facebook').attr('href', organizer.facebook);
        $('#organizer_twitter').attr('href', organizer.twitter);
    });

    // Cancel Button
    $('#cancel').on('click', () => {
        cancelOrder(data.id, data.transactionId);
    });

    // Summary
    let orderItems = data.orderItems;
    let total = 0;

    let summaryList = $('#summary_list');
    orderItems.forEach((orderItem) => {
        total += (orderItem.unitPrice + orderItem.unitBookingFee) * orderItem.quantity;

        summaryList.append(`
            <tr>
                <td>${orderItem.name}</td>
                <td>${formatRupiah(orderItem.unitPrice)}</td>
                <td>${formatRupiah(orderItem.unitBookingFee)}</td>
                <td>${orderItem.quantity}</td>
                <td>${formatRupiah((orderItem.unitPrice + orderItem.unitBookingFee) * orderItem.quantity)}</td>
            </tr>
        `);
    });

    $('#summary_total').text(formatRupiah(total));

    let ticketOrders = data.ticketOrders;

    const groupedArray = orderItems.reduce((acc, item, index) => {
        acc[index] = {
          orderItem: item,
          ticketOrder: ticketOrders[index]
        };
        return acc;
    }, []);

    // Ticket List
    let ticketList = $('#ticket_list');
    groupedArray.forEach((ticket) => {
        // loop for quantity
        for (let i = 0; i < ticket.orderItem.quantity; i++) {
            ticketList.append(`
                <div class="row border-bottom pb-4 mb-4">
                    <input type="hidden" name="order_id" value="${data.id}">
                    <input type="hidden" name="event_id" value="${event.id}">
                    <input type="hidden" name="transaction_id" value="${data.transactionId}">
                    <input type="hidden" name="ticket_id[]" value="${ticket.ticketOrder.ticketId}">
                    <div class="mb-3 text-center col-lg-12">
                        <h6>${ticket.orderItem.name}</h6>
                    </div>
                    <div class="mb-3 col-lg-6">
                        <label class="form-label">First name</label>
                        <input type="text" name="firstname[]" class="form-control" placeholder="First name" required="" value="${user.firstname}">
                    </div>
                    <div class="mb-3 col-lg-6">
                        <label class="form-label">Last name</label>
                        <input type="text" name="lastname[]" class="form-control" placeholder="Last name" value="${user.lastname}">
                    </div>
                    <div class="mb-3 col-lg-12">
                        <label class="form-label">Email </label>
                        <input type="email" name="email[]" class="form-control" placeholder="Email" required="" value="${user.email}">
                    </div>
                </div>
            `);
        }
    });
};

const fallbackResult = (message) => {
    alert(message);
};

const handleBooking = async () => {
    let submitButton = $('#form button[type=submit]');
    let form = $('#form');

    submitButton.attr('disabled', true);
    submitButton.html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`);

    let data = form.serializeArray();
    let event_id = '';
    let order_id = '';
    let transaction_id = '';
    let tickets = [];
    let firstnames = [];
    let lastnames = [];
    let emails = [];
    let attendees = [];

    data.forEach((item) => {
        if(item.name === 'event_id') event_id = item.value;
        if(item.name === 'order_id') order_id = item.value;
        if(item.name === 'transaction_id') transaction_id = item.value;
        if(item.name === 'ticket_id[]') tickets.push(item.value);
        if(item.name === 'firstname[]') firstnames.push(item.value);
        if(item.name === 'lastname[]') lastnames.push(item.value);
        if(item.name === 'email[]') emails.push(item.value);
    });

    for(let i = 0; i < tickets.length; i++) {
        attendees.push({
            eventId:  parseInt(event_id),
            ticketId: parseInt(tickets[i]),
            firstname: firstnames[i],
            lastname: lastnames[i],
            email: emails[i]
        });
    }

    let payloads = {
        orderId: parseInt(order_id),
        attendees: attendees
    }

    await saveBooking(payloads).then((result) => {
        window.location.href = '/pay/' + transaction_id;
    });
};

const events = () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
            'submit',
            function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (form.checkValidity() === true) {
                    handleBooking();
                }

                form.classList.add('was-validated');
            },
            false
        );
    });
};

const main = () => {
    events();

    let url = window.location.pathname;
    let transactionId = url.substring(url.lastIndexOf('/') + 1);
    getBookingByTransactionId(transactionId);
};

main();
