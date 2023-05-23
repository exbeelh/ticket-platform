const getEvent = async (slug) => {
    try {
        const result = await DataSource.getEventBySlug(slug);

        if(result.code === 404) window.location.href = '/notfound';

        renderDetail(result);
    } catch (message) {
        alert(message);
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

const getTickets = async (id) => {
    try {
        const result = await DataSource.getTicketsByEventId(id);

        return result.data;
    } catch (message) {
        alert(message);
    }
};

const buyTickets = async () => {

};

const renderDetail = (result) => {
    let event = result.data;
    let eventType = event.type === 1 ? 'Online' : 'Offline';
    let eventDateStart = new Date(event.startDate);
    let eventMonthStart = eventDateStart.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
    let eventDateEnd = new Date(event.endDate);
    let eventMonthEnd = eventDateEnd.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

    $('#event_title').text(event.title);
    $('#event_type').text(eventType);
    $('#event_datetime').text(eventMonthStart + ', ' + event.startTime + ' - ' + eventMonthEnd + ', ' + event.endTime);
    $('#event_description').text(event.description);

    getOrganizer(event.organizerId).then((organizer) => {
        $('#organizer_name').text(organizer.name);
        $('#organizer_description').text(organizer.description);
    });

    getTickets(event.id).then((tickets) => {
        $('#buyTicketModal .modal-body').empty();
        let index = 0;
        tickets.forEach((ticket) => {
            let ticketPrice = ticket.price;
            let ticketFee = ticketPrice * 0.1;
            let ticketTotal = ticketPrice + ticketFee;
            let ticketDetail = ticketPrice === 0 ? 'FREE' : `${formatRupiah(ticketPrice)} + ${formatRupiah(ticketFee)} = ${formatRupiah(ticketTotal)}`;

            $('#buyTicketModal .modal-body').append(`
                <div class="p-3 mb-2 bg-white">
                    <div class="d-flex align-self-center justify-content-between">
                        <div class="">
                            <h6 class="ticket-title">${ticket.name}</h6>
                            <input type="hidden" name="event_id" value="${event.id}">
                            <input type="hidden" name="ticket_id[]" value="${ticket.id}">
                            <input type="hidden" name="ticket_name[]" value="${ticket.name}">
                            <input type="hidden" name="tid[]" value="${ticket.price}">
                            <span class="ticket-price">
                                <small>${ticketDetail}</small>
                                <small class="ticket-remaiming badge bg-danger">${ticket.quantityAvaible} Remaining</small>
                            </span>
                        </div>
                        <div class="">
                            <select name="ticket_type_qty[${index++}]" class="custom-select ticket form-control">
                                <option value="0" selected="selected">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                </div>
            `);
        });

        const prices = tickets.map(ticket => ticket.price);
        const lowestPrice = Math.min(...prices) === 0 ? 'Free' : Math.min(...prices);
        const highestPrice = Math.max(...prices);

        $('#event_ticket').text(lowestPrice + ' - ' + highestPrice);
    });
};

const events = () => {
    let submitButton = $('#buyTicketModal .modal-footer button[type=submit]');
    let form = $('#buyTicketModal form');

    form.submit(async (event) => {
        event.preventDefault();

        submitButton.attr('disabled', true);
        submitButton.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');

        let data = form.serializeArray();
        let tickets = [];
        let ticketNames = [];
        let ticketPrices = [];
        let ticketQty = [];
        let ticketOrders = [];
        let orderItems = [];
        let ticketTotal = 0;
        let ticketFee = 0;
        let ticketPrice = 0;

        data.forEach((item) => {
            if(item.name === 'event_id') event_id = item.value;
            if(item.name === 'ticket_name[]') ticketNames.push(item.value);
            if(item.name === 'ticket_id[]') tickets.push(item.value);
            if(item.name === 'tid[]') ticketPrices.push(parseInt(item.value));
            if(item.name.includes('ticket_type_qty')) ticketQty.push(parseInt(item.value));
        });

        for(let i = 0; i < ticketPrices.length; i++) {
            ticketPrice = ticketPrices[i] * ticketQty[i];
            ticketTotal += ticketPrice;
        }

        ticketFee = ticketTotal * 0.1;

        for(let i = 0; i < tickets.length; i++) {
            if(ticketQty[i] === 0) continue;

            orderItems.push({
                quantity: ticketQty[i],
                unitPrice: ticketPrices[i],
                unitBookingFee: ticketPrices[i] * 0.1,
            });

            ticketOrders.push({
                ticketId: parseInt(tickets[i]),
            });
        }

        let order = {
            eventId: parseInt(event_id),
            bookingFee: ticketFee,
            amount: ticketTotal + ticketFee,
            userId: 1,
            orderItems: orderItems,
            ticketOrders: ticketOrders
        };

        let result = await DataSource.buyTickets(order);

        if(result.code === 400) {
            alert(result.message);
            submitButton.attr('disabled', false);
            submitButton.html('Buy Tickets');
            return;
        }

        alert('Success buy tickets').then(() => {
            window.location.href = '/order/booking/' + result.data.transactionId;
        });

        // localStorage.setItem('ticketData', JSON.stringify(ticketData));

        // window.location.href = '/checkout';
    });
};

const main = () => {
    events();

    // get event id from url
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    getEvent(id);
};

main();
