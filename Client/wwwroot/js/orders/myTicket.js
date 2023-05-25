const getMyTicket = async (id) => {
    try {
        const result = await DataSource.getMyTicket(id);
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const renderResult = (result) => {
    console.log(result);
    let html = '';

    if (result.data.length === 0) {
        html += `
            <tr>
                <td colspan="5" class="text-center">No data found</td>
            </tr>
        `;
        $('#ticket_list').html(html);
        return;
    }

    result.data.forEach((item) => {
        let date = new Date(item.orderDate);
        let month = date.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        html += `
            <tr>
                <td>#${item.transactionId}</td>
                <td>${item.eventName}</td>
                <td>On ${month}</td>
                <td>
                    ${statusOrder(item.orderStatusId, item.orderStatusName)}
                </td>
                <td>
                    <a class="btn btn-light btn-sm" asp-area="" asp-controller="Order" asp-action="Index"> <i class="fa fa-eye"></i>Detail</a>
                </td>
            </tr>
        `;
    });

    $('#ticket_list').html(html);
};

const fallbackResult = (message) => {
    alert(message);
};

const events = async () => {
}

const main = () => {
    events();
    getMyTicket(JWTUserID);
}

main();
