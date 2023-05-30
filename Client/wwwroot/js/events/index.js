const getUpcomingEvents = async () => {
    try {
        const result = await DataSource.getUpcomingEvents();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const getTickets = async (id) => {
    try {
        const result = await DataSource.getTicketsByEventId(id);

        return result.data;
    } catch (message) {
        alert(message);
    }
};

const renderResult = (result) => {
    let upcomingEvent = '';
    result.data.forEach((event) => {
        let eventType = event.type === 1 ? 'Online' : 'Offline';
        let eventDate = new Date(event.startDate);
        let eventMonth = eventDate.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        upcomingEvent += `
            <div class="col-lg-6 mb-4">
                <div class="listing-item">
                    <div class="listing-image bg-overlay-half-top">
                        <img class="img-fluid" src="${BASE_URL_API}/images/${event.image}" alt="">
                        <div class="listing-quick-box">
                            <a class="category" href="#">${event.category}</a>
                            <a class="popup popup-single" href="${BASE_URL_API}/images/${event.image}" data-bs-toggle="tooltip" data-placement="top" title="Zoom"> <i class="fas fa-search-plus"></i> </a>
                            <a class="like" href="#" data-bs-toggle="tooltip" data-placement="top" title="Like"> <i class="far fa-bookmark"></i> </a>
                        </div>
                    </div>
                    <div class="listing-details">
                        <div class="listing-details-inner">
                            <div class="listing-title mb-2">
                                <h6><a href="${BASE_URL}/event/d/${event.slug}">${event.title}</a></h6>
                                <span class="listing-price" id="event_ticket_${event.id}"></span>
                            </div>
                            <p class="mb-3">${event.description}</p>
                            <div class="listing-rating-call">
                                <a class="listing-rating" href="#"> ${eventMonth} AT ${event.startTime}</a>
                            </div>
                        </div>
                        <div class="listing-bottom">
                            <a class="listing-loaction" href="#"> <i class="fas fa-map-marker-alt"></i> ${eventType}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });


    const upcomingEventElement = document.querySelector('#event-list');
    upcomingEventElement.innerHTML = upcomingEvent;
};

const fallbackResult = (message) => {
    const upcomingEventElement = document.querySelector('#event-list');
    upcomingEventElement.innerHTML = `
        <div class="col-lg-12 col-sm-12 mb-4">
            <h3 class="text-center">${message}</h3>
        </div>
    `;
};

const events = () => {
    let buttonFilter = document.querySelector('#button-filter');
    buttonFilter.addEventListener('click', async () => {
        let filter = document.querySelector('#searchQuery').value;
        let category = parseInt(document.querySelector('#category_id').value);
        let result = null;

        if (filter) {
            result = await DataSource.searchEvents(filter);
        } else if (category) {
            result = await DataSource.getEventsByCategoryId(category);
        } else {
            result = await DataSource.getUpcomingEvents();
        }

        renderResult(result);
    });

    $('.basic-select-category').select2({
        placeholder: 'Select Category',
        ajax: {
            url: `${BASE_URL_API}/api/categories`,
            dataType: 'json',
            data: function (params) {
                return {
                    search: params.term,
                };
            },
            processResults: function (data) {
                return {
                    results: data.data.map((category) => {
                        return {
                            id: category.id,
                            text: category.name,
                        };
                    }),
                };
            },
            cache: true,
        },
    });
};

const main = () => {
    events();
    getUpcomingEvents();
};

main();
