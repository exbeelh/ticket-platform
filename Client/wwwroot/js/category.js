const getCategories = async () => {
    try {
        const result = await DataSource.getCategories();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const insertCategory = async () => {
    let category = {
        name: $('#name').val(),
        slug: $('#name').val().toLowerCase().replace(/ /g, '-'),
    };

    try {
        await DataSource.insertCategory(category);
        toastr.success('Category has been added', 'Success');

        $('#categoryModal').modal('hide');
        reloadData();
    } catch (message) {
        toastr.error(message, 'Oops...');
    }
};

const updateCategory = async () => {
    let category = {
        id: $('#id').val(),
        name: $('#name').val(),
        slug: $('#name').val().toLowerCase().replace(/ /g, '-'),
    };

    try {
        await DataSource.updateCategory(category);
        toastr.success('Category has been updated', 'Success');

        $('#categoryModal').modal('hide');
        reloadData();
    } catch (message) {
        toastr.error(message, 'Oops...');
    }
};

const add = () => {
    $('#categoryModal .modal-title').text('Add Category');
    $('#name').val('');
    $('#id').remove();
    $('#submit-btn').attr('value', 'add');
    $('#submit-btn').html('Save changes');
};

const edit = async (id) => {
    try {
        const result = await DataSource.getCategoryById(id);

        $('#id').remove();
        $('#categoryModal .modal-title').text('Edit Category');
        $('#categoryModal .modal-footer').append(
            `<input type="hidden" id="id" name="id" value="${result.data.id}">`
        );
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
                await DataSource.deleteCategory(id);
                toastr.success('Category has been deleted', 'Success');
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
        const result = await DataSource.getCategories();

        $('#category_datatable').DataTable().clear();
        $('#category_datatable').DataTable().rows.add(result.data).draw();
    } catch (message) {
        Swal.fire({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const renderResult = (results) => {
    $('#category_datatable').dataTable({
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
            { data: 'name' },
            { data: 'slug' },
            {
                data: '',
                width: '30px',
                render: function (data, type, row) {
                    return `
                        <div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bi bi-three-dots"></i></a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item dt-edit" href="javascript:void(0)" onclick="edit(${row['id']})" data-bs-toggle="modal" data-bs-target="#categoryModal">Edit</a>
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
    const categoryListElement = document.querySelector('#category-list');
    categoryListElement.innerHTML = `
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
                        await insertCategory();
                    } else {
                        await updateCategory();
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
    getCategories();
};

main();
