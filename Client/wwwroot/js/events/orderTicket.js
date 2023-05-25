const getEvent = async (id) => {
    try {
        const result = await DataSource.getEventById(id);
        const data = result.data;
        let eventDateStart = new Date(data.startDate);
        let eventMonthStart = eventDateStart.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
        let eventDateEnd = new Date(data.endDate);
        let eventMonthEnd = eventDateEnd.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
        let date = eventMonthStart + ' AT ' + data.startTime + ' - ' + eventMonthEnd + ' AT ' + data.endTime;

        let address = data.address ? `Address : ${data.address} <br>` : '';
        let link = data.link ? `Link : ${data.link} <br>` : '';
        let note = data.note ? `Note : ${data.note} <br>` : '';

        let detail = `${address} ${link} ${note}`;

        $('#event').html(`
            <h1 class="text-white">${data.title}</h1>
            <span class="d-inline-block text-white">${detail}</span>
            <span class="d-inline-block text-white">Date : ${date}</span>
            <div>
                <a class="btn btn-light mt-4 btn-sm" href="#"><i class="far fa-edit"></i> Edit </a>
                <a class="btn btn-light mt-4 btn-sm" href="${BASE_URL}/event/d/${data.slug}"><i class="far fa-eye"></i>View </a>
            </div>
        `);
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
                    <td colspan="4" class="text-center">No data found</td>
                </tr>
            `;
            $('#order_ticket').html(html);
            return;
        }

        data.forEach((item, index) => {
            html += `
                <tr class="table-secondary">
                    <td>Order Id : ${item.transactionId}</td>
                    <td>${item.fullName}</td>
                    <td></td>
                    <td>${item.email}</td>
                </tr>
            `;

            item.attendees.forEach((attendee, index) => {
                html += `
                    <tr>
                        <td>${attendee.transactionId}</td>
                        <td>${attendee.code}</td>
                        <td>${attendee.ticketName}</td>
                        <td>${attendee.firstName + ' ' + attendee.lastName}</td>
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
    getEvent(id);
    getOrderTicketsByEventId(id);
};

main();
