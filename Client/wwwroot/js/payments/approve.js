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

    if(data.length === 0) {
        html += `
            <div class="text-center">
                <h6 class="mb-3"> No request payment </h6>
            </div>
        `;

        $('#list_pending_payment').html(html);
        return;
    }

    data.forEach((item, index) => {
        let date = new Date(item.paymentAt);
        let month = date.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });
        let time = date.toLocaleString('default', { hour: "numeric", minute: "numeric", second: "numeric" });

        let dateOrder = new Date(item.order.orderDate);
        let monthOrder = dateOrder.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        html += `
            <div class="border-bottom pb-4 mb-4">
                <div class="row">
                    <div class="col-xl-1 col-lg-2">
                        <div class="avatar avatar-lg">
                            <img src="../dist/images/avatar/01.jpg" class="img-fluid rounded-circle" alt="...">
                        </div>
                    </div>
                    <div class="col-xl-11 col-lg-10">
                        <div class="px-xl-4 px-0 mt-lg-0 mt-3">
                            <div class="d-sm-flex align-items-center">
                                <h6 class="mt-0">${item.user.firstname}</h6>
                                <div class="d-flex ms-auto mb-3">
                                    <a href="javascript:void(0)" class="bg-success-soft text-success border-radius px-3 py-1 font-sm me-2" onclick="approvePayment(${item.id})"> Approved </a>
                                    <href="javascript:void(0)" class="bg-danger-soft text-danger border-radius px-3 py-1 font-sm" onclick="rejectPayment(${item.id})"> Rejected </href=>
                                </div>
                            </div>
                            <div class="booking-item d-flex mb-3">
                                <strong class="col-6 col-sm-3">Order ID: </strong> <span>${item.order.transactionId}</span>
                            </div>
                            <div class="booking-item d-flex mb-3">
                                <strong class="col-6 col-sm-3">Event Title: </strong> <span>${item.event.title}</span>
                            </div>
                            <div class="booking-item d-flex mb-3">
                                <strong class="col-6 col-sm-3">Order Date: </strong> <span>${monthOrder}</span>
                            </div>
                            <div class="booking-item d-flex mb-3">
                                <strong class="col-6 col-sm-3">Amount: </strong> <span>${formatRupiah(item.order.amount)}</span>
                            </div>
                            <div class="booking-item d-flex mb-3">
                                <strong class="col-6 col-sm-3">Payment Date: </strong> <span>${month}, ${time}</span>
                            </div>
                            <div class="d-flex">
                                <a class="btn btn-secondary btn-sm" href="${BASE_URL_API}/images/${item.fileImg}" target="_blank"> <i class="far fa-file-image pe-1"></i> Payment Image </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    getListPendingPayment(JWTUserID);
    events();
}

main();
