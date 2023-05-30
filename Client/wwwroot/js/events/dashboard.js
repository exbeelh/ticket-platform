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

const getTicketEventByEventId = async (id) => {
    try {
        const result = await DataSource.getTicketEventByEventId(id);

        const data = result.data;

        let html = '';
        let list = '';

        if (data.length === 0) {
            html += `
                <div class="text-center">
                    <h6 class="mb-3"> No ticket created </h6>
                </div>
            `;
            $('#ticket_list').html(html);
            return;
        }

        data.forEach((ticket) => {
            let ticketSold = ticket.quantitySold;
            let ticketTotal = ticket.quantityAvailable + ticketSold;
            let percentage = (ticketSold / ticketTotal) * 100;

            html += `
                <div class="widget mb-4">
                    <div class="widget-content">
                        <div class="">
                            <div class="d-flex align-items-center border-bottom pb-2 mb-2">
                                <h6 class="mb-0">${ticket.name}</h6>
                            </div>
                            <p class="mb-2">${ticketSold} Tickets sold / ${ticketTotal}</p>
                            ${percentageProgress(percentage)}
                        </div>
                    </div>
                </div>
            `;

            list += `
                <tr>
                    <td>${ticket.name}</td>
                    <td>${formatRupiah(ticket.price)}</td>
                    <td>${ticketSold} / ${ticketTotal}</td>
                </tr>
            `;
        });

        $('#ticket_list').html(html);
        $('#ticket_sales').html(list);
    } catch (message) {
        alert(message);
    }
};

const getTotalByEventId = async (id) => {
    try {
        const result = await DataSource.getTotalByEventId(id);

        const data = result.data;
        let percentage = (data.totalTicketsSold / data.totalAllTickets) * 100;

        let html = `
            <div class="widget-content">
                <div class="">
                    <div class="d-flex align-items-center border-bottom pb-2 mb-2">
                        <h6 class="mb-0">Total Tickets</h6>
                    </div>
                    <p class="mb-2">${data.totalTicketsSold} Tickets sold / ${data.totalAllTickets}</p>
                    <div class="progress" style="height: 30px;">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: ${percentage}%;" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        `;

        $('#ticket_total').html(html);
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
    getTicketEventByEventId(id);
    getTotalByEventId(id);

    $('#print_attendees').on('click', () => {
        let print = window.open(`${BASE_URL}/event/attendees/${id}`, '_blank');
        print.onload = () => {
            setTimeout(() => {
                print.print();
            }, 2000);
        }
    });
};

main();
