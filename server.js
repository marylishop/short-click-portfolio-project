const express = require('express');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const mongoose = require('mongoose');
const AdminJS = require('adminjs');

const app = express();

// Connect to MongoDB (replace 'your_database_uri' with your actual MongoDB URI)
mongoose.connect('mongodb://admin:admin1212@localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Add your resources (collections) here
const { yourModelResource } = require('./admin/resources'); // Replace with your actual resource file path

// Use AdminJS middleware
app.use('/admin', AdminJSExpress.init({
  resources: [yourModelResource],
}));

// Serve your existing frontend files
app.use(express.static('public')); // Adjust the path based on your project structure

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
