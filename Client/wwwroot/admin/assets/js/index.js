$(document).ready(function () {
    $.ajax({
        url: "https://localhost:7292/api/Events",
        success: function (response) {
            let cardsHtml = response.data.map((card, index) => {
                // Define Bootstrap classes for different types and statuses
                const typeClass = card.type === 0 ? "text-danger" : "text-success";
                const statusClass = card.statusId === 0 ? "text-bg-warning" : "text-bg-success";

                return `<tr>
                  <td>${card.title}</td>
                  <td class="${typeClass}">${card.type === 0 ? "Offline" : "Online"}</td>
                  <td>${card.startTime}</td>
                  <td class="${statusClass}">${card.statusId === 0 ? "Pending" : "Approved"}</td>
                </tr>`;
            }).join('');

            $("#aproved-event").html(cardsHtml);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "https://localhost:7292/api/Organizers",
        success: function (response) {
            // Limit the number of items to display
            const numberOfItemsToShow = 4; // Change this value to the desired number of items

            let cardsHtml = response.data.slice(0, numberOfItemsToShow).map((card, index) => {
                return `<tr>
              <td>${card.name}</td>
              <td>${card.description}</td>
              <td>${card.link}</td>
            </tr>`;
            }).join('');

            $("#list-organizer").html(cardsHtml);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "https://localhost:7292/api/Events",
        success: function (response) {
            // Limit the number of items to display
            const numberOfItemsToShow = 8; // Change this value to the desired number of items

            let cardsHtml = response.data.slice(0, numberOfItemsToShow).map((card, index) => {
                return `<tr>
              <td>${card.title}</td>
              <td>${card.views}</td>
              <td>${card.link}</td>
            </tr>`;
            }).join('');

            $("#event-visited").html(cardsHtml);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "https://localhost:7292/api/Users",
        success: function (response) {
            // Limit the number of items to display
            const numberOfItemsToShow = 8; // Change this value to the desired number of items

            let cardsHtml = response.data.slice(0, numberOfItemsToShow).map((card, index) => {
                return `<tr>
              <td>${card.firstname + " " + card.lastname}</td>
              <td>${card.countryId}</td>
              <td>${card.email}</td>
            </tr>`;
            }).join('');

            $("#user-list").html(cardsHtml);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});