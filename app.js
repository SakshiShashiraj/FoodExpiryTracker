import { FoodTracker } from './foodTracker.js';

// Initialize FoodTracker instance
const tracker = new FoodTracker();

// Load existing items from local storage
tracker.loadFromLocalStorage();

// Add item event
document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('foodName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const quantity = document.getElementById('quantity').value;

    // Add food item to tracker
    tracker.addFoodItem(name, 'general', expiryDate, quantity);

    // Save to local storage
    tracker.saveToLocalStorage();

    // Clear input fields after submission
    document.getElementById('addItemForm').reset();

    alert('Item added to fridge!');
});

// View fridge button event
document.getElementById('viewFridge').addEventListener('click', function() {
    window.location.href = 'fridge.html';
});