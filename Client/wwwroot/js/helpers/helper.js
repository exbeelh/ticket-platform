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

const percentageProgress = (percent) => {
    if (percent > 75) {
        return `
            <div class="progress">
                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">${percent}%</div>
            </div>
        `;
    } else if (percent > 50) {
        return `
            <div class="progress">
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">${percent}%</div>
            </div>
        `;
    } else if (percent > 25) {
        return `
            <div class="progress">
                <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">${percent}%</div>
            </div>
        `;
    } else {
        return `
            <div class="progress">
                <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">${percent}%</div>
            </div>
        `;
    }
}
