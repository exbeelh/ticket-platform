const getDetails = async (id) => {
    try {
        const result = await DataSource.getOrderDetailByTransactionId(id);

        const dataEvent = result.data;

        let eventDateStart = new Date(dataEvent.event.startDate);
        let eventMonthStart = eventDateStart.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
        let eventDateEnd = new Date(dataEvent.event.endDate);
        let eventMonthEnd = eventDateEnd.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
        let date = eventMonthStart + ' AT ' + dataEvent.event.startTime + ' - ' + eventMonthEnd + ' AT ' + dataEvent.event.endTime;

        let orderDate = new Date(dataEvent.orderDate);
        let orderDateTime = orderDate.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        let html = '';
        try {
            const result = await DataSource.getAttendeesByOrderId(dataEvent.id);

            const data = result.data;

            data.attendees.forEach(async (item, index) => {
                html += `
                    <table class="table table2 table2-bordered">
                        <tr class="table-red">
                            <th colspan="2">ORDER ID : #${dataEvent.transactionId}</th>
                        </tr>
                        <tr>
                            <td width="70%">
                                <h3 style="color: #FF2222;">${dataEvent.event.title}</h3>
                                <br>
                                <h5>Event Date and Time</h5>
                                <p>${date}</p>

                                <h5>Address</h5>
                                <p>Rajkot, Gujarat, India</p>

                                <h5>ORDER INFO</h5>
                                <p>Order Id : #${dataEvent.transactionId}<br>Ordered by : ${dataEvent.user.firstname + " " + dataEvent.user.lastname}<br>On ${orderDateTime}</p>
                            </td>
                            <td width="30%">
                                <img src="${BASE_URL_API}/images/${dataEvent.event.image}" alt="event" width="100%" class="p-2">

                                <h5>TICKET FOR NAME</h5>
                                <p>${item.firstName + " " + item.lastName}</p>

                                <h5>TICKET NAME</h5>
                                <p>${item.ticketName}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>Do you organize events?</h6>
                                <p>Email : eventorganizer@placy.com <br> https://contoh-url-website-event.com</p>
                            </td>
                            <td>
                                ${item.code}
                            </td>
                        </tr>
                    </table>

                    <div class="page-break"></div>
                `;
            });

            $('#detail').html(html);
        } catch (message) {
            alert(message);
        }
    } catch (message) {
        alert(message);
    }
};

const events = async () => {};

const main = () => {
    events();

    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    getDetails(id);
};

main();
