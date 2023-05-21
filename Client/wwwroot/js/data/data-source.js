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
        return fetch(`${BASE_URL}api/orderstatusses`, {
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
        return fetch(`${BASE_URL}api/orderstatusses/${id}`, {
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
        return fetch(`${BASE_URL}api/orderstatusses`, {
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
        return fetch(`${BASE_URL}api/orderstatusses/${orderStatus.id}`, {
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
        return fetch(`${BASE_URL}api/orderstatusses/${id}`, {
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
}
