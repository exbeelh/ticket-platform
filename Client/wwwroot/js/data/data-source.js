const BASE_URL = 'https://localhost:7291/';

class DataSource {
    // Category
    static getCategories() {
        return fetch(`${BASE_URL}api/categories`, {
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
        return fetch(`${BASE_URL}api/categories/${id}`, {
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
        return fetch(`${BASE_URL}api/categories`, {
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
        return fetch(`${BASE_URL}api/categories/${category.id}`, {
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
        return fetch(`${BASE_URL}api/categories/${id}`, {
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
        return fetch(`${BASE_URL}api/countries`, {
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
        return fetch(`${BASE_URL}api/countries/${id}`, {
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
        return fetch(`${BASE_URL}api/countries`, {
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
        return fetch(`${BASE_URL}api/countries/${country.id}`, {
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
        return fetch(`${BASE_URL}api/countries/${id}`, {
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
        return fetch(`${BASE_URL}api/roles`, {
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
        return fetch(`${BASE_URL}api/roles/${id}`, {
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
        return fetch(`${BASE_URL}api/roles`, {
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
        return fetch(`${BASE_URL}api/roles/${role.id}`, {
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
        return fetch(`${BASE_URL}api/roles/${id}`, {
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
        return fetch(`${BASE_URL}api/orderstatuses`, {
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
        return fetch(`${BASE_URL}api/orderstatuses/${id}`, {
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
        return fetch(`${BASE_URL}api/orderstatuses`, {
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
        return fetch(`${BASE_URL}api/orderstatuses/${orderStatus.id}`, {
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
        return fetch(`${BASE_URL}api/orderstatuses/${id}`, {
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
        return fetch(`${BASE_URL}api/events`, {
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
        return fetch(`${BASE_URL}api/events/upcoming`, {
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
        return fetch(`${BASE_URL}api/events/${id}`, {
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
        return fetch(`${BASE_URL}api/events/detail/${slug}`, {
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
        return fetch(`${BASE_URL}api/events/search?searchQuery=${searchTerm}`, {
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
        return fetch(`${BASE_URL}api/events/category/${id}`, {
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
        return fetch(`${BASE_URL}api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
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
        return fetch(`${BASE_URL}api/events/approve/${id}`, {
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
        return fetch(`${BASE_URL}api/events/banned/${id}`, {
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
        return fetch(`${BASE_URL}api/organizers/${id}`, {
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
    static getTicketsByEventId(id) {
        return fetch(`${BASE_URL}api/events/tickets/${id}`, {
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

    // Orders
    static buyTickets(order) {
        return fetch(`${BASE_URL}api/orders/buytickets`, {
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
        return fetch(`${BASE_URL}api/orders/booking/${id}`, {
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
}
