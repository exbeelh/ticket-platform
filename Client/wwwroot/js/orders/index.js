const getDetails = async (id) => {
    try {
        const result = await DataSource.getOrderDetailByTransactionId(id);

        const data = result.data;
        let orderId = 'ORDER ID : #' + data.transactionId
        let orderDate = new Date(data.orderDate);
        let orderMonth = orderDate.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        let eventDateStart = new Date(data.event.startDate);
        let eventMonthStart = eventDateStart.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
        let eventDateEnd = new Date(data.event.endDate);
        let eventMonthEnd = eventDateEnd.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
        let date = eventMonthStart + ' AT ' + data.event.startTime + ' - ' + eventMonthEnd + ' AT ' + data.event.endTime;

        $('#order_id').text(orderId);
        $('#event_url').attr('href', '/event/d/' + data.event.slug);
        $('#event_url').html(data.event.title);
        $('#order_detail_id').html(orderId + '<br> On ' + orderMonth);
        $('#event_detail').html(date);

        let html = '';
        let total = 0;
        data.orderItems.forEach((item, index) => {
            html += `
                <tr class="bg-light">
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${formatRupiah(item.unitPrice)}</td>
                    <td>${item.quantity}</td>
                    <td>${formatRupiah(item.unitPrice * item.quantity)}</td>
                </tr>
            `;

            total += item.unitPrice * item.quantity;
        });

        $('#ticket_details').html(html);
        $('#order_total').html(formatRupiah(total));

        if(data.orderStatusId !== 3) {
            $('#print_ticket').hide();
        }

        $('#print_ticket').on('click', () => {
            let print = window.open(`${BASE_URL}/order/invoice/print/${data.transactionId}`, '_blank');
            print.onload = () => {
                setTimeout(() => {
                    print.print();
                }, 2000);
            }
        });
    } catch (message) {
        alert(message);
    }
};

const events = () => {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    getDetails(id);
};

const main = () => {
    events();
}

main();
