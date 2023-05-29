const getUpcomingEvents = async () => {
    try {
        const result = await DataSource.getUpcomingEvents();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const getFeaturedEvents = async () => {
    try {
        const result = await DataSource.getFeaturedEvents();
        renderResultFeatured(result);
    } catch (message) {
        fallbackResultFeatured(message);
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

const getCategories = async () => {
    try {
        const result = await DataSource.getCategories();

        const categoryElement = document.querySelector('#categories');
        let categories = '';
        result.data.forEach((category) => {
            categories += `
                <li class="category-item-01">
                    <a href="${BASE_URL}/event" data-categoryId="${category.id}">
                        <div class="category-icon">
                            <img class="img-fluid" src="dist/images/category/01.jpg" alt="">
                        </div>
                        <div class="category-content">
                            <h6>${category.name}</h6>
                            <span>(22)</span>
                        </div>
                    </a>
                </li>
            `;
        });
        categoryElement.innerHTML = categories;
    } catch (message) {
        categoryElement.innerHTML = `
            <li class="category-item-01">
                <span class="text-center">${message}</span>
            </li>
        `;
    }
};

const renderResult = (result) => {
    let upcomingEvent = '';

    if (result.data.length === 0) {
        upcomingEvent = `
            <div class="col-lg-12 col-sm-12 mb-4">
                <h3 class="text-center">No upcoming events</h3>
            </div>
        `;
    }

    result.data.forEach((event) => {
        let eventType = event.type === 1 ? 'Online' : 'Offline';
        let eventDate = new Date(event.startDate);
        let eventMonth = eventDate.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        upcomingEvent += `
            <div class="col-lg-4 col-sm-6 mb-4">
                <div class="listing-item">
                    <div class="listing-image bg-overlay-half-top">
                        <img class="img-fluid" src="${BASE_URL_API}/images/${event.image}" alt="">
                        <div class="listing-quick-box">
                            <a class="category" href="#">Cafe</a>
                            <a class="popup popup-single" href="${BASE_URL_API}/images/${event.image}" data-bs-toggle="tooltip" data-placement="top" title="Zoom"> <i class="fas fa-search-plus"></i> </a>
                            <a class="like" href="#" data-bs-toggle="tooltip" data-placement="top" title="Bookmark"> <i class="far fa-bookmark"></i> </a>
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

    const upcomingEventElement = document.querySelector('#upcoming-events');
    upcomingEventElement.innerHTML = upcomingEvent;
};

const renderResultFeatured = (result) => {
    let featuredEvent = '';

    if (result.data.length === 0) {
        featuredEvent = `
            <div class="item">
                <div class="col-lg-12 col-sm-12 mb-4">
                    <h3 class="text-center">No Featured events</h3>
                </div>
            </div>
        `;
    }

    result.data.forEach((event) => {
        let eventType = event.type === 1 ? 'Online' : 'Offline';
        let eventDate = new Date(event.startDate);
        let eventMonth = eventDate.toLocaleString('default', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

       let content = `
            <div class="item">
                <div class="listing-item">
                    <div class="listing-image bg-overlay-half-top">
                        <img class="img-fluid" src="${BASE_URL_API}/images/${event.image}" alt="">
                        <div class="listing-quick-box">
                            <a class="category" href="#">Cafe</a>
                            <a class="popup popup-single" href="${BASE_URL_API}/images/${event.image}" data-bs-toggle="tooltip" data-placement="top" title="Zoom"> <i class="fas fa-search-plus"></i> </a>
                            <a class="like" href="#" data-bs-toggle="tooltip" data-placement="top" title="Bookmark"> <i class="far fa-bookmark"></i> </a>
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

        $('.owl-carousel').trigger('add.owl.carousel', [content]);
    });

    $('.owl-carousel').trigger('refresh.owl.carousel');
};

const fallbackResult = (message) => {
    const upcomingEventElement = document.querySelector('#upcoming-events');
    upcomingEventElement.innerHTML = `
        <div class="col-lg-12 col-sm-12 mb-4">
            <h3 class="text-center">${message}</h3>
        </div>
    `;
};

const fallbackResultFeatured = (message) => {
    const featuredEventElement = document.querySelector('#featured-events');
    featuredEventElement.innerHTML = `
        <div class="item">
            <div class="col-lg-12 col-sm-12 mb-4">
                <h3 class="text-center">${message}</h3>
            </div>
        </div>
    `;
};

const events = () => {
    // $('.owl-carousel').owlCarousel({
    //     loop: true,
    //     items: 3,
    //     responsive: {
    //     0: {
    //         items: 1
    //     },
    //     575: {
    //         items: 1
    //     },
    //     768: {
    //         items: 2
    //     },
    //     980: {
    //         items: 3
    //     },
    //     1200: {
    //         items: 3
    //     }
    //     },
    //     dots: true,
    //     autoplayTimeout: 5000,
    //     smartSpeed: 1000,
    //     autoHeight: false,
    //     margin: 20,
    //     nav: false,
    //     navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    //     autoplay: true,
    //     autoplayHoverPause: true
    // });
};

const main = () => {
    events();
    getUpcomingEvents();
    getFeaturedEvents();
    getCategories();
};

main();
