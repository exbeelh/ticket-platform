const getEvent = async (id) => {
    try {
        const result = await DataSource.getEventById(id);
        const data = result.data;

        $('#event_title').html(data.title);
    } catch (message) {
        alert(message);
    }
};

const getOrderTicketsByEventId = async (id) => {
    try {
        const result = await DataSource.getOrderTicketsByEventId(id);
        const data = result.data;

        let html = '';

        if (data.length === 0) {
            html += `
                <tr>
                    <td colspan="6" class="text-center">No data found</td>
                </tr>
            `;
            $('#order_ticket').html(html);
            return;
        }

        let no = 1;
        data.forEach((item, index) => {
            html += `
                <tr class="table-grey">
                    <td colspan="2" style="text-align: left;font-weight:bold;">Order Id : ${item.transactionId}</td>
                    <td colspan="4" style="text-align: left;">${item.fullName}</td>
                </tr>
            `;

            item.attendees.forEach((attendee, index) => {
                html += `
                    <tr>
                        <td>${no++}</td>
                        <td>${attendee.transactionId}</td>
                        <td>${attendee.code}</td>
                        <td>${attendee.ticketName}</td>
                        <td>${attendee.firstName + ' ' + attendee.lastName}</td>
                        <td>${attendee.email}</td>
                    </tr>
                `;
            });
        });

        $('#order_ticket').html(html);
    } catch (message) {
        alert(message);
    }
};

const events = async () => {};

const main = () => {
    events();

    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    getOrderTicketsByEventId(id);
    getEvent(id);
};

main();
