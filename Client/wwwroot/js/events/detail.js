const getEvent = async (id) => {
    try {
        const result = await DataSource.getEventById(id);

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

const renderDetail = (result) => {
    let event = result.data;
    let eventType = event.type === 1 ? 'Online' : 'Offline';
    let eventDateStart = new Date(event.startDate);
    let eventMonthStart = eventDateStart.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
    let eventDateEnd = new Date(event.endDate);
    let eventMonthEnd = eventDateEnd.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

    if (eventType === 'Online') {
        $('.online').removeClass('d-none');
    } else {
        $('.offline').removeClass('d-none');
    }

    $('#event_title').text(event.title);
    $('#event_type').text(eventType);
    $('#event_datetime').text(eventMonthStart + ' AT ' + event.startTime + ' - ' + eventMonthEnd + ' AT ' + event.endTime);
    $('#event_description').text(event.description);
    $('#event_address').text(event.address);
    $('#event_link').text(event.link);
    $('#event_note').text(event.note);
    $('#event_link').attr('href', event.link);
    $('#event_image').attr('src', `${BASE_URL_API}/images/${event.image}`);
    $('#event_image').attr('alt', event.title);

    getOrganizer(event.organizerId).then((organizer) => {
        $('#organizer_name').text(organizer.name);
        $('#organizer_description').text(organizer.description);
        // $('#organizer_image').attr('src', organizer.image);
    });

    getTickets(event.id).then((tickets) => {
        $('#ticket_list').empty();

        tickets.forEach((ticket) => {
            let ticketHtml = `
                <tr>
                    <td>${ticket.name}</td>
                    <td>${formatRupiah(ticket.price)}</td>
                    <td>${ticket.quantityAvailable + ticket.quantitySold}</td>
                </tr>
            `;

            $('#ticket_list').append(ticketHtml);
        });

        const prices = tickets.map(ticket => ticket.price);
        const lowestPrice = Math.min(...prices) === 0 ? 'Free' : formatRupiah(Math.min(...prices));
        const highestPrice = Math.max(...prices);

        $('.dsh-price').text(lowestPrice + ' - ' + formatRupiah(highestPrice));
    });
};

const events = () => {
};

const main = () => {
    events();

    // get event id from url
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    getEvent(id);
}

main();
