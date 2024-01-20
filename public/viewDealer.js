document.addEventListener('DOMContentLoaded', function () {
    // Fetch dealers data from the server
    fetch('/dealers')
        .then(response => response.json())
        .then(dealers => displayDealers(dealers))
        .catch(error => console.error('Error fetching dealers', error));

    function displayDealers(dealers) {
        const tbody = document.querySelector('tbody');

        dealers.forEach(dealer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dealer.dealers_uid}</td>
                <td>${dealer.dealer_name}</td>
                <td>${dealer.mobile}</td>
                <td>${dealer.place}</td>
                <td><button onclick="showDealerDetails(${dealer.dealers_uid})">View</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Add event listener for search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function () {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        filterRows(searchInput);
    });

    function filterRows(searchInput) {
        const tbody = document.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            const columns = row.querySelectorAll('td');
            let rowText = '';

            columns.forEach(column => {
                rowText += column.textContent.toLowerCase() + ' ';
            });

            if (rowText.includes(searchInput)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function showDealerDetails(dealerId) {
        // Fetch dealer details from the server based on dealerId
        fetch(`/dealers/${dealerUID}`)
            .then(response => response.json())
            .then(dealer => {
                const popup = document.getElementById('dealer-details-popup');
                popup.innerHTML = `
                    <h3>${dealer.dealer_name}</h3>
                    <p>ID: ${dealer.dealers_uid}</p>
                    <p>Mobile: ${dealer.mobile}</p>
                    <p>Place: ${dealer.place}</p>
                `;
                popup.style.display = 'block';
            })
            .catch(error => console.error(`Error fetching dealer details for ID ${dealerUID}`, error));
    }
});
