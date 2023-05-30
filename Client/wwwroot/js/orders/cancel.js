const getBookingByTransactionId = async (transactionId) => {
    try {
        const result = await DataSource.getBookingByTransactionId(transactionId);
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const renderResult = (result) => {
    let data = result.data;

    $('#event_title').text(data.event.title);
    $('#transaction_id').text(data.transactionId);

    let totalTickets = 0;

    data.orderItems.forEach((item) => {
        totalTickets += item.quantity;
    });

    $('#total_ticket').text(totalTickets);
    $('#go_to_event').attr('href', '/event/d/' + data.event.slug);
};

const fallbackResult = (message) => {
    alert(message);
};

const events = async () => {
};

const main = () => {
    events();

    let url = window.location.pathname;
    let transactionId = url.substring(url.lastIndexOf('/') + 1);
    getBookingByTransactionId(transactionId);
};

main();
