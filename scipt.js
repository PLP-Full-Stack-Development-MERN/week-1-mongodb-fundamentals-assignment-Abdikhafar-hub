// Connect to the 'library' database
use library;

// Create 'books' collection and insert initial book records
db.books.insertMany([
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925, genre: "Classic", ISBN: "9780743273565" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960, genre: "Classic", ISBN: "9780061120084" },
  { title: "The Da Vinci Code", author: "Dan Brown", publishedYear: 2003, genre: "Thriller", ISBN: "9780385504201" },
  { title: "Sapiens", author: "Yuval Noah Harari", publishedYear: 2011, genre: "Non-fiction", ISBN: "9780062316097" },
  { title: "Atomic Habits", author: "James Clear", publishedYear: 2018, genre: "Self-Help", ISBN: "9780735211292" }
]);

// Retrieve all books
print("All Books:");
db.books.find().pretty();

// Query books by a specific author
print("Books by Dan Brown:");
db.books.find({ author: "Dan Brown" }).pretty();

// Find books published after the year 2000
print("Books published after 2000:");
db.books.find({ publishedYear: { $gt: 2000 } }).pretty();

// Update the publishedYear of a specific book
db.books.updateOne(
  { ISBN: "9780385504201" },
  { $set: { publishedYear: 2004 } }
);

// Add a 'rating' field to all books
db.books.updateMany(
  {},
  { $set: { rating: 4.5 } }
);

// Delete a book by its ISBN
db.books.deleteOne({ ISBN: "9780061120084" });

// Remove all books of a specific genre
db.books.deleteMany({ genre: "Classic" });

// Aggregation: Find the total number of books per genre
print("Total books per genre:");
db.books.aggregate([
  { $group: { _id: "$genre", totalBooks: { $sum: 1 } } }
]).forEach(printjson);

// Aggregation: Calculate the average published year of all books
print("Average published year:");
db.books.aggregate([
  { $group: { _id: null, avgPublishedYear: { $avg: "$publishedYear" } } }
]).forEach(printjson);

// Aggregation: Identify the top-rated book
print("Top-rated book:");
db.books.find().sort({ rating: -1 }).limit(1).forEach(printjson);

// Indexing: Create an index on the 'author' field
db.books.createIndex({ author: 1 });

// E-commerce Data Model

// Create 'users' collection
db.createCollection("users");
db.users.insertOne({ name: "John Doe", email: "john@example.com", address: "123 Main St", orders: [] });

// Create 'products' collection
db.createCollection("products");
db.products.insertMany([
  { name: "Laptop", price: 1200, category: "Electronics", stock: 10 },
  { name: "Phone", price: 800, category: "Electronics", stock: 20 }
]);

// Create 'orders' collection
db.createCollection("orders");
db.orders.insertOne({
  userId: ObjectId("user_id_here"),
  products: [{ productId: ObjectId("product_id_here"), quantity: 1 }],
  totalAmount: 1200,
  status: "Pending"
});

print("Database setup and operations completed successfully!");
