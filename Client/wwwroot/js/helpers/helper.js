const formatRupiah = (price) => {
    return `Rp. ${price.toLocaleString('id-ID')}`;
}

const statusOrder = (status, name) => {
    if(status === 1) {
        return `<label class="badge mb-0 bg-warning">${name}</label>`;
    } else if(status === 2) {
        return `<label class="badge mb-0 bg-info">${name}</label>`;
    } else if(status === 3) {
        return `<label class="badge mb-0 bg-success">${name}</label>`;
    } else if(status === 4) {
        return `<label class="badge mb-0 bg-danger">${name}</label>`;
    } else if(status === 5) {
        return `<label class="badge mb-0 bg-danger">${name}</label>`;
    }
}
