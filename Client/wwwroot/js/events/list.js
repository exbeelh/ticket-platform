const getEvents = async () => {
    try {
        const result = await DataSource.getEvents();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const approve = async (id) => {
    try {
        await Swal.fire({
            title: 'Are you sure?',
            text: "Once approved, you will not be able to change this data!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.value) {
                await DataSource.approveEvent(id);
                toastr.success('Event has been approved', 'Success');
                reloadData();
            }
        });
    } catch (message) {
        Swal.fire({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const banned = async (id) => {
    try {
        await Swal.fire({
            title: 'Are you sure?',
            text: "Once banned, you will not be able to change this data!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, ban it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.value) {
                await DataSource.bannedEvent(id);
                toastr.success('Event has been banned', 'Success');
                reloadData();
            }
        });
    } catch (message) {
        Swal.fire({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const reloadData = async () => {
    try {
        const result = await DataSource.getEvents();

        $('#event_datatable').DataTable().clear();
        $('#event_datatable').DataTable().rows.add(result.data).draw();
    } catch (message) {
        Swal.fire({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const renderResult = (results) => {
    $('#event_datatable').dataTable({
        responsive: true,
        dom: "<'row'<'col-sm-6 text-start'f><'col-sm-6 text-end'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
        buttons: {
            buttons: [
                {
                    extend: 'print',
                    className: 'btn-primary',
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                    },
                },
                {
                    extend: 'excelHtml5',
                    className: 'btn-primary',
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                    },
                },
                {
                    extend: 'csvHtml5',
                    className: 'btn-primary',
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                    },
                },
                {
                    extend: 'pdfHtml5',
                    className: 'btn-primary',
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                    },
                },
            ],
        },
        data: results.data,
        columns: [
            {
                data: null,
                width: '20',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            { data: 'title' },
            {
                data: 'statusId',
                render: function (data, type, row) {
                    if (data == 1) {
                        return `<span class="badge bg-success">Approved</span>`;
                    } else if (data == 2) {
                        return `<span class="badge bg-danger">Banned</span>`;
                    } else {
                        return `<span class="badge bg-warning">Pending</span>`;
                    }
                },
             },
            {
                data: 'statusId',
                width: '30px',
                render: function (data, type, row) {
                    if(data == 0) {
                        return `
                            <div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bi bi-three-dots"></i></a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item dt-ban" href="detail/${row['id']}">Detail</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item dt-ban" href="javascript:void(0)" onclick="banned(${row['id']})">Ban</a>
                                    <a class="dropdown-item dt-approve" href="javascript:void(0)" onclick="approve(${row['id']})">Terima</a>
                                </div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bi bi-three-dots"></i></a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item dt-ban" href="detail/${row['id']}">Detail</a>
                                </div>
                            </div>
                        `;
                    }
                },
            },
        ],
    });
};

const fallbackResult = (message) => {
    const eventListElement = document.querySelector('#event-list');
    eventListElement.innerHTML = `
        <tr>
            <th colspan="3" class="p-4 text-center">${message}</th>
        </tr>
    `;
};

const events = () => {

};

const main = () => {
    events();
    getEvents();
};

main();
