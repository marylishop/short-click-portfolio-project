const router = require('express').Router();
const Admin = require('../models/Admin');

// Route to manage users
router.get('/manageUsers', (req, res) => {
    Admin.find()
        .then(users => res.json({ users }))
        .catch(err => res.status(400).json({ error: 'Error fetching users', details: err }));
});

module.exports = router;
