const getBookingByTransactionId = async (transactionId) => {
    try {
        const result = await DataSource.getBookingByTransactionId(transactionId);
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const uploadPayment = async (data) => {
    try {
        const result = await DataSource.uploadPayment(data);

        if (result.code === 400) {
            alert(result.message);
            return;
        }

        return result.data;
    } catch (message) {
        alert(message);
    }
};

const renderResult = (result) => {
    let data = result.data;
    let user = data.user;

    $('#order_id').val(data.id);
    $('#transaction_id').val(data.transactionId);
    $('#payment_by').text(user.firstname + ' ' + user.lastname);
    $('#email').text(user.email);
    $('#total_paid_amount').text(formatRupiah(data.amount));
};

const fallbackResult = (message) => {
    alert(message);
};

const events = () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
            'submit',
            async function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (form.checkValidity() === true) {
                    let submitButton = $('#form button[type=submit]');

                    submitButton.attr('disabled', true);
                    submitButton.html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`);

                    var formData = new FormData();
                    formData.append("orderId", parseInt($('#order_id').val()));
                    formData.append("userId", JWTUserID);
                    formData.append('imageFile', $('#customFile')[0].files[0]);

                    await uploadPayment(formData).then((result) => {
                       window.location.href = '/order/success/' + $('#transaction_id').val();
                    });
                }

                form.classList.add('was-validated');
            },
            false
        );
    });
};

const main = () => {
    events();

    let url = window.location.pathname;
    let transactionId = url.substring(url.lastIndexOf('/') + 1);
    getBookingByTransactionId(transactionId);
};

main();
