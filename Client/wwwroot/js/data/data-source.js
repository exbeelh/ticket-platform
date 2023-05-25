const BASE_URL_API = 'https://localhost:7292';

class DataSource {
    // Category
    static getCategories() {
        return fetch(`${BASE_URL_API}/api/categories`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getCategoryById(id) {
        return fetch(`${BASE_URL_API}/api/categories/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static insertCategory(category) {
        return fetch(`${BASE_URL_API}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static updateCategory(category) {
        return fetch(`${BASE_URL_API}/api/categories/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 204) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static deleteCategory(id) {
        return fetch(`${BASE_URL_API}/api/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 204) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Countries
    static getCountries() {
        return fetch(`${BASE_URL_API}/api/countries`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getCountryById(id) {
        return fetch(`${BASE_URL_API}/api/countries/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static insertCountry(country) {
        return fetch(`${BASE_URL_API}/api/countries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(country),
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static updateCountry(country) {
        return fetch(`${BASE_URL_API}/api/countries/${country.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(country),
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 204) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static deleteCountry(id) {
        return fetch(`${BASE_URL_API}/api/countries/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 204) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Role
    static getRoles() {
        return fetch(`${BASE_URL_API}/api/roles`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getRoleById(id) {
        return fetch(`${BASE_URL_API}/api/roles/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static insertRole(role) {
        return fetch(`${BASE_URL_API}/api/roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role),
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static updateRole(role) {
        return fetch(`${BASE_URL_API}/api/roles/${role.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role),
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 204) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static deleteRole(id) {
        return fetch(`${BASE_URL_API}/api/roles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 204) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Order Status
    static getOrderStatuses() {
        return fetch(`${BASE_URL_API}/api/orderstatuses`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getOrderStatusById(id) {
        return fetch(`${BASE_URL_API}/api/orderstatuses/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static insertOrderStatus(orderStatus) {
        return fetch(`${BASE_URL_API}/api/orderstatuses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderStatus),
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static updateOrderStatus(orderStatus) {
        return fetch(`${BASE_URL_API}/api/orderstatuses/${orderStatus.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderStatus),
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 204) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static deleteOrderStatus(id) {
        return fetch(`${BASE_URL_API}/api/orderstatuses/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 204) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Events
    static getEvents() {
        return fetch(`${BASE_URL_API}/api/events`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getUpcomingEvents() {
        return fetch(`${BASE_URL_API}/api/events/upcoming`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getEventById(id) {
        return fetch(`${BASE_URL_API}/api/events/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getTicketsByEventId(id) {
        return fetch(`${BASE_URL_API}/api/events/tickets/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getEventBySlug(slug) {
        return fetch(`${BASE_URL_API}/api/events/detail/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static searchEvents(searchTerm) {
        return fetch(`${BASE_URL_API}/api/events/search?searchQuery=${searchTerm}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getEventsByCategoryId(id) {
        return fetch(`${BASE_URL_API}/api/events/category/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static insertEvent(event) {
        return fetch(`${BASE_URL_API}/api/events/request`, {
            method: 'POST',
            body: event,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static approveEvent(id) {
        return fetch(`${BASE_URL_API}/api/events/approve/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 200) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static bannedEvent(id) {
        return fetch(`${BASE_URL_API}/api/events/banned/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 200) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Organizers
    static getOrganizerById(id) {
        return fetch(`${BASE_URL_API}/api/organizers/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Tickets
    static getMyTicket(id) {
        return fetch(`${BASE_URL_API}/api/orders/mytickets/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getListEventOrganizer(id) {
        return fetch(`${BASE_URL_API}/api/events/listeventorganizer/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getTotalByEventId(id) {
        return fetch(`${BASE_URL_API}/api/tickets/total/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getTicketEventByEventId(id) {
        return fetch(`${BASE_URL_API}/api/tickets/event/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Orders
    static buyTickets(order) {
        return fetch(`${BASE_URL_API}/api/orders/buytickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getBookingByTransactionId(id) {
        return fetch(`${BASE_URL_API}/api/orders/booking/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static saveBooking(booking) {
        return fetch(`${BASE_URL_API}/api/orders/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getTicketSalesByEventId(id) {
        return fetch(`${BASE_URL_API}/api/orders/ticketsales/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 200) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static getRevenueByEventId(id) {
        return fetch(`${BASE_URL_API}/api/orders/revenue/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 200) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Payment
    static uploadPayment(payment) {
        return fetch(`${BASE_URL_API}/api/payments/upload`, {
            method: 'POST',
            body: payment,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                console.log("Errorrr : ", error);
                return Promise.reject(error);
            });
    }

    static getListPendingPayment(userId) {
        return fetch(`${BASE_URL_API}/api/payments/listpendingpayment?id=${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static approvePayment(id) {
        return fetch(`${BASE_URL_API}/api/payments/approve/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 200) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    static rejectPayment(id) {
        return fetch(`${BASE_URL_API}/api/payments/reject/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response;
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 200) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Attendees
    static getOrderTicketsByEventId(id) {
        return fetch(`${BASE_URL_API}/api/attendees/ordertickets/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson && responseJson.status === 200) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}
