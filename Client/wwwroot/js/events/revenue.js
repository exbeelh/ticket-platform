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

const getRevenueByEventId = async (id) => {
    try {
        const result = await DataSource.getRevenueByEventId(id);
        const data = result.data;
        let html = '';

        if (data.length === 0) {
            html += `
                <tr>
                    <td colspan="7" class="text-center">No data found</td>
                </tr>
            `;
            $('#revenue_earned').html(html);
            return;
        }

        data.forEach((item, index) => {
            html += `
                <tr>
                    <td>${item.ticketName}</td>
                    <td>#${item.transactionId}</td>
                    <td>${item.quantity}</td>
                    <td>${formatRupiah(item.price)}</td>
                    <td>${formatRupiah(item.totalPrice)}</td>
                    <td>${formatRupiah(item.commission)}</td>
                    <td>${formatRupiah(item.finalAmount)}</td>
                </tr>
            `;
        });

        $('#revenue_earned').html(html);
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
    getRevenueByEventId(id);
};

main();
