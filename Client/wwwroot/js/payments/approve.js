const getListPendingPayment = async (userId) => {
    try {
        const result = await DataSource.getListPendingPayment(userId);
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const renderResult = (result) => {
    let data = result.data;
    let html = '';

    data.forEach((item, index) => {
        let date = new Date(item.paymentAt);
        let month = date.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
        let time = date.toLocaleString('default', { hour: "numeric", minute: "numeric", second: "numeric" });

        html += `
            <tr>
                <td>${item.order.transactionId}</td>
                <td>${item.user.firstname} ${item.user.lastname}</td>
                <td>${item.event.title} </td>
                <td>${month}, ${time}</td>
                <td>${formatRupiah(item.order.amount)}</td>
                <td><a href="${item.fileImg}" target="_blank">File</a></td>
                <td>
                    <button type="button" class="btn btn-success btn-sm" onclick="approvePayment(${item.id})">Approve</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="rejectPayment(${item.id})">Reject</button>
                </td>
            </tr>
        `;
    });

    $('#list_pending_payment').html(html);
};

const approvePayment = async (id) => {
    try {
        const result = await DataSource.approvePayment(id);

        if(result.code === 400) {
            alert(result.message);
            return;
        }

        Swal.fire({
            title: 'Success',
            text: 'Payment has been approved',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/payment/approve';
            }
        });
    } catch (message) {
        alert(message);
    }
};

const rejectPayment = async (id) => {
    try {
        const result = await DataSource.rejectPayment(id);

        if(result.code === 400) {
            alert(result.message);
            return;
        }

        Swal.fire({
            title: 'Success',
            text: 'Payment has been rejected',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/payment/approve';
            }
        });
    } catch (message) {
        alert(message);
    }
};

const fallbackResult = (message) => {
    alert(message);
};

const events = async () => {
};

const main = () => {
    getListPendingPayment(1);
    events();
}

main();
