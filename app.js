class FoodItem {
    constructor(name, category, expiryDate, quantity) {
        this.name = name;
        this.category = category;
        this.expiryDate = new Date(expiryDate);  // store expiry as Date object
        this.quantity = quantity;
    }
}

class FoodTracker {
    constructor() {
        this.foodItems = [];
    }

    // Add a food item
    addFoodItem(name, category, expiryDate, quantity) {
        const newItem = new FoodItem(name, category, expiryDate, quantity);
        this.foodItems.push(newItem);
        console.log(`Added: ${name}, Expires on: ${expiryDate}, Quantity: ${quantity}`); // Log the added item
    }

    // Get all food items
    getAllItems() {
        return this.foodItems;
    }

    // Remove expired items
    removeExpiredItems() {
        const today = new Date();
        this.foodItems = this.foodItems.filter(item => item.expiryDate >= today);
    }

    // Get items expiring soon (within the next 7 days)
    getExpiringSoon() {
        const today = new Date();
        const upcomingDate = new Date();
        upcomingDate.setDate(today.getDate() + 7);
        return this.foodItems.filter(item => item.expiryDate >= today && item.expiryDate <= upcomingDate);
    }
}

// Initialize FoodTracker instance
const tracker = new FoodTracker();

// Add item event
document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('foodName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const quantity = document.getElementById('quantity').value;

    // Add food item to tracker
    tracker.addFoodItem(name, 'general', expiryDate, quantity);

    // Display items and expiring items
    displayItems();
    displayExpiringSoon();

    // Clear input fields after submission
    document.getElementById('addItemForm').reset();
});

// Display items
function displayItems() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = ''; // Clear existing items
    tracker.getAllItems().forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (Expires: ${item.expiryDate.toDateString()}, Quantity: ${item.quantity})`;
        foodList.appendChild(li);
    });
}

// Display expiring soon
function displayExpiringSoon() {
    const expiringSoonList = document.getElementById('expiringSoonList');
    expiringSoonList.innerHTML = ''; // Clear existing items
    tracker.getExpiringSoon().forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (Expires: ${item.expiryDate.toDateString()}, Quantity: ${item.quantity})`;
        expiringSoonList.appendChild(li);
    });
}
