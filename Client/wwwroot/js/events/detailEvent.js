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
        const prices = tickets.map(ticket => ticket.price);
        const lowestPrice = Math.min(...prices) === 0 ? 'Free' : Math.min(...prices);
        const highestPrice = Math.max(...prices);

        $('#event_ticket').text(lowestPrice + ' - ' + highestPrice);
    });
};

const events = () => {

};

const main = () => {
    events();

    // get event id from url
    let url = window.location.pathname;
    let slug = url.substring(url.lastIndexOf('/') + 1);
    getEvent(slug);
};

main();
