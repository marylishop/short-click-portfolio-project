const router = require('express').Router();
const Admin = require('../models/Admin');

// Route to fetch all users
router.route('/').get((req, res) => {
    Admin.find()
        .then(admins => res.json(admins))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new user
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newAdmin = new Admin({
        username,
        password,
    });

    newAdmin.save()
        .then(() => res.json('Admin added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to manage users
router.route('/manageUsers').get((req, res) => {
    // Your logic to manage users goes here
    // For example, you can fetch users and send them as a response
    Admin.find()
        .then(users => res.json({ users }))
        .catch(err => res.status(400).json('Error fetching users: ' + err));
});

module.exports = router;
