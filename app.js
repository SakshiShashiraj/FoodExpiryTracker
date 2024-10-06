// Initialize Firestore
const db = firebase.firestore();

// Handle form submission
document.getElementById('food-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form values
  const foodName = document.getElementById('food-name').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const quantity = document.getElementById('quantity').value;

  // Add to Firestore
  await db.collection('food-items').add({
    name: foodName,
    expiry: expiryDate,
    quantity: parseInt(quantity),
  });

  alert('Food item added!');
  document.getElementById('food-form').reset();
});

// Display food items
db.collection('food-items').onSnapshot((snapshot) => {
  const foodList = document.getElementById('food-list');
  foodList.innerHTML = '';

  snapshot.forEach((doc) => {
    const food = doc.data();
    foodList.innerHTML += `<p>${food.name} - Expiry: ${food.expiry} - Quantity: ${food.quantity}</p>`;
  });
});
