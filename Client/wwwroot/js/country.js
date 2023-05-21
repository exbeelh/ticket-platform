const getCountries = async () => {
    try {
        const result = await DataSource.getCountries();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const insertCountry = async () => {
    let country = {
        id: $('#country_id').val(),
        name: $('#name').val(),
    };

    try {
        await DataSource.insertCountry(country);
        toastr.success('Country has been added', 'Success');

        $('#countryModal').modal('hide');
        reloadData();
    } catch (message) {
        toastr.error(message, 'Oops...');
    }
};

const updateCountry = async () => {
    let country = {
        id: $('#country_id').val(),
        name: $('#name').val(),
    };

    try {
        await DataSource.updateCountry(country);
        toastr.success('Country has been updated', 'Success');

        $('#countryModal').modal('hide');
        reloadData();
    } catch (message) {
        toastr.error(message, 'Oops...');
    }
};

const add = () => {
    $('#countryModal .modal-title').text('Add Country');
    $('#name').val('');
    $('#country_id').val('');
    $('#submit-btn').attr('value', 'add');
    $('#submit-btn').html('Save changes');
};

const edit = async (id) => {
    try {
        const result = await DataSource.getCountryById(id);

        $('#countryModal .modal-title').text('Edit Country');
        $('#country_id').val(result.data.id);
        $('#name').val(result.data.name);
        $('#submit-btn').attr('value', 'edit');
        $('#submit-btn').html('Update');
    } catch (message) {
        Swal.fire({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const remove = async (id) => {
    try {
        await Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.value) {
                await DataSource.deleteCountry(id);
                toastr.success('Country has been deleted', 'Success');
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
        const result = await DataSource.getCountries();

        $('#country_datatable').DataTable().clear();
        $('#country_datatable').DataTable().rows.add(result.data).draw();
    } catch (message) {
        Swal.fire({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const renderResult = (results) => {
    $('#country_datatable').dataTable({
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
            { data: 'id' },
            { data: 'name' },
            {
                data: '',
                width: '30px',
                render: function (data, type, row) {
                    return `
                        <div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bi bi-three-dots"></i></a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item dt-edit" href="javascript:void(0)" onclick="edit(${row['id']})" data-bs-toggle="modal" data-bs-target="#countryModal">Edit</a>
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
    const countryListElement = document.querySelector('#country-list');
    countryListElement.innerHTML = `
        <tr>
            <th colspan="3" class="p-4 text-center">${message}</th>
        </tr>
    `;
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
                    const submitBtn = document.querySelector('#submit-btn');
                    if (submitBtn.value === 'add') {
                        await insertCountry();
                    } else {
                        await updateCountry();
                    }
                }

                form.classList.add('was-validated');
            },
            false
        );
    });
};

const main = () => {
    events();
    getCountries();
};

main();
