import { FoodTracker } from './foodTracker.js';

const tracker = new FoodTracker();

// Load items from localStorage
tracker.loadFromLocalStorage();

function displayFridgeContents() {
    const fridgeContents = document.getElementById('fridgeContents');
    fridgeContents.innerHTML = ''; // Clear existing items

    const today = new Date();
    const fourDaysLater = new Date(today.getTime() + (4 * 24 * 60 * 60 * 1000));

    tracker.getAllItems().forEach((item, index) => {
        const itemDate = new Date(item.expiryDate);
        const div = document.createElement('div');
        div.className = 'fridge-item';
        
        const expiringWithin4Days = itemDate <= fourDaysLater;
        const numberCircle = `<span class="item-number ${expiringWithin4Days ? 'expiring' : ''}">${index + 1}</span>`;
        
        const recipesButton = expiringWithin4Days ? 
            `<a href="recipes.html?item=${encodeURIComponent(item.name)}" class="recipes-button">Recipies</a>` : '';
        
        div.innerHTML = `
            ${numberCircle}
            <span class="item-name">${item.name}</span>
            ${recipesButton}
            <span class="item-date">${itemDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        `;
        
        fridgeContents.appendChild(div);
    });
}

// Display fridge contents when the page loads
displayFridgeContents();

// Back to Add Items button event
document.getElementById('backToAdd').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('findCompost').addEventListener('click', () => {
    findPlaces('compost');
});

document.getElementById('findFoodShelter').addEventListener('click', () => {
    findPlaces('food donation');
});

function findPlaces(placeType) {
    // Assuming user grants permission for location access
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const map = new google.maps.Map(document.createElement('div')); // Dummy div for creating a map

            const service = new google.maps.places.PlacesService(map);
            const request = {
                location: userLocation,
                radius: '5000', // 5km radius
                keyword: placeType // Searching for 'compost' or 'food donation'
            };
            console.log(request);

            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(`Nearby ${placeType} spots:`);
                    results.forEach((place) => {
                        console.log(place.name, place.vicinity);
                        // You can append these results to the DOM or show on a map
                    });
                } else {
                    console.log('Places request failed due to:', status);
                }
            });
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

const resultsDiv = document.getElementById('results');
results.forEach((place) => {
    const placeElement = document.createElement('p');
    placeElement.innerText = `${place.name} - ${place.vicinity}`;
    resultsDiv.appendChild(placeElement);
});