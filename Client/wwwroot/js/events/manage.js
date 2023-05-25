const getListEventOrganizer = async (id) => {
    try {
        const result = await DataSource.getListEventOrganizer(id);
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const renderResult = (result) => {
    let html = '';

    if (result.data.length === 0) {
        html += `
            <div class="text-center">
                <h6 class="mb-3"> No event created </h6>
            </div>
        `;
        $('#event_list').html(html);
        return;
    }

    result.data.forEach((event) => {
        let eventType = event.type === 1 ? 'Online' : 'Offline';
        let eventPublish = event.isPublish === 1 ? 'Publish' : 'Draft';
        let eventDate = new Date(event.startDate);
        let eventMonth = eventDate.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        html += `
            <div class="listing-item listing-list mb-4">
                <div class="row g-0">
                    <div class="col-lg-4 col-md-5">
                        <div class="listing-image bg-overlay-half-top h-100">
                            <img class="img-fluid" src="${BASE_URL_API}/images/${event.image}" alt="">
                            <div class="listing-quick-box">
                            </div>
                            <div class="listing-info">
                                <span class="badge bg-light text-black p-1 rounded">${event.views} Views</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-7">
                        <div class="listing-details h-100">
                            <div class="listing-details-inner">
                                <div class="listing-title">
                                    <h6><a href="${BASE_URL}/event/d/${event.slug}">${event.title}</a></h6>
                                    <a class="ms-auto btn btn-light btn-sm px-3" data-bs-toggle="tooltip" data-bs-placement="top" href="${BASE_URL}/event/dashboard/${event.id}"><i class="fas fa-gear pe-0"></i></a>
                                    <a class="btn btn-warning btn-sm px-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" href="#"><i class="far fa-edit pe-0"></i></a>
                                    <a class="btn btn-info btn-sm px-3" data-bs-toggle="tooltip" data-bs-placement="top" title="View" href="${BASE_URL}/event/d/${event.slug}"><i class="far fa-eye pe-0"></i></a>
                                </div>
                                <p class="my-2">${event.description}</p>
                                <div class="listing-rating-call">
                                    <a class="listing-rating" href="#">${eventMonth} AT ${event.startTime}</a>
                                </div>
                            </div>
                            <div class="listing-bottom">
                                <a class="listing-loaction" href="#"> <i class="fas fa-map-marker-alt"></i> ${eventType}</a>
                                <span class="listing-open">${eventPublish}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    $('#event_list').html(html);
};

const fallbackResult = (message) => {
    alert(message);
};

const events = async () => {
}

const main = () => {
    events();
    getListEventOrganizer(JWTUserID);
}

main();
