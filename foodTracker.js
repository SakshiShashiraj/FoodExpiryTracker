export class FoodItem {
    constructor(name, category, expiryDate, quantity) {
        this.name = name;
        this.category = category;
        this.expiryDate = new Date(expiryDate);
        this.quantity = quantity;
    }
}

export class FoodTracker {
    constructor() {
        this.foodItems = [];
    }

    addFoodItem(name, category, expiryDate, quantity) {
        const newItem = new FoodItem(name, category, expiryDate, quantity);
        this.foodItems.push(newItem);
    }

    getAllItems() {
        return this.foodItems;
    }

    removeExpiredItems() {
        const today = new Date();
        this.foodItems = this.foodItems.filter(item => item.expiryDate >= today);
    }

    getExpiringSoon() {
        const today = new Date();
        const upcomingDate = new Date();
        upcomingDate.setDate(today.getDate() + 7);
        return this.foodItems.filter(item => item.expiryDate >= today && item.expiryDate <= upcomingDate);
    }

    saveToLocalStorage() {
        localStorage.setItem('fridgeItems', JSON.stringify(this.foodItems));
    }

    loadFromLocalStorage() {
        const storedItems = JSON.parse(localStorage.getItem('fridgeItems') || '[]');
        this.foodItems = storedItems.map(item => new FoodItem(item.name, item.category, item.expiryDate, item.quantity));
    }
}