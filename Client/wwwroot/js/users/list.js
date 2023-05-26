const getUsers = async () => {
    try {
        const result = await DataSource.getUsers();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const renderResult = (results) => {
    $('#user_list_datatable').dataTable({
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
                data: 'picture',
                render: function (data, type, row) {
                    return `<img src="${BASE_URL_API}/images/${data}" alt="${row['name']}" class="rounded-circle">`;
                }
            },
            {
                data: '',
                render: function (data, type, row) {
                    return `
                        ${row['firstname']} ${row['lastname'] ?? ''}<br>
                    `;
                }
            },
            { data: 'phoneNumber' },
            { data: 'email' },
            { data: 'city' },
            {
                data: '',
                width: '30px',
                render: function (data, type, row) {
                    return `
                        <div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bi bi-three-dots"></i></a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item dt-edit" href="javascript:void(0)" onclick="detail(${row['id']})" data-bs-toggle="modal" data-bs-target="#organizerModal">Detail</a>
                                <a class="dropdown-item dt-edit" href="javascript:void(0)" onclick="edit(${row['id']})" data-bs-toggle="modal" data-bs-target="#organizerModal">Edit</a>
                                <a class="dropdown-item dt-delete" href="javascript:void(0)" onclick="remove(${row['id']})">Delete</a>
                            </div>
                        </div>
					`;
                },
            },
        ],
    });
};

const fallbackResult = (message) => {
    const organizerListElement = document.querySelector('#user-list');
    organizerListElement.innerHTML = `
        <tr>
            <th colspan="6" class="p-4 text-center">${message}</th>
        </tr>
    `;
};

const events = () => {
};

const main = () => {
    events();
    getUsers();
};

main();
