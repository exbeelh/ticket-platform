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

const getTicketSalesByEventId = async (id) => {
    try {
        const result = await DataSource.getTicketSalesByEventId(id);
        const data = result.data;
        let html = '';

        if (data.length === 0) {
            html += `
                <tr>
                    <td colspan="7" class="text-center">No data found</td>
                </tr>
            `;
            $('#ticket_sales_list').html(html);
            return;
        }

        data.forEach((item) => {
            let orderDate = new Date(item.orderDate);
            let orderMonth = orderDate.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

            html += `
                <tr>
                    <td> #${item.transactionId}</td>
                    <td> ${item.fullName}</td>
                    <td> ${item.quantity}</td>
                    <td> ${formatRupiah(item.payment)}</td>
                    <td> ${orderMonth}</td>
                    <td>
                        <a data-bs-toggle="modal" data-bs-target="#detailOrderModal" onclick="detailOrder('${item.transactionId}')" href=""><i class="fa fa-eye"></i> View Order</a>
                    </td>
                    <td>
                        <span class="badge bg-success p-2">Completed</span>
                    </td>
                </tr>
            `;
        });

        $('#ticket_sales_list').html(html);
    } catch (message) {
        alert(message);
    }
};

const detailOrder = async (id) => {
    try {
        const result = await DataSource.getOrderDetailByTransactionId(id);

        const data = result.data;
        let date = new Date(data.orderDate);
        let orderMonth = date.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        let orderDetail = `${data.user.firstname} ${data.user.lastname} (${data.user.email}) on ${orderMonth}`;
        let orderList = '';
        let sumQuantity = 0;
        let sumTotal = 0;

        data.orderItems.forEach((item) => {
            let orderType = item.unitPrice === 0 ? 'Free' : 'Paid';

            orderList += `
                <tr>
                    <td width="30%">${item.name}</td>
                    <td>${orderType}</td>
                    <td class="text-center">${item.quantity}</td>
                    <td class="text-right">${formatRupiah(item.unitPrice)}</td>
                    <td class="text-right">${formatRupiah(item.unitPrice * item.quantity)}</td>
                </tr>
            `;

            sumQuantity += item.quantity;
            sumTotal += item.unitPrice * item.quantity;
        });

        $('#detailOrderModalLabel').html(`#${data.transactionId}`);
        $('#order_detail').html(orderDetail);
        $('#ticket_list').html(orderList);
        $('#sum_quantity').html(sumQuantity);
        $('#sum_total').html(formatRupiah(sumTotal));
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
    getTicketSalesByEventId(id);
};

main();
