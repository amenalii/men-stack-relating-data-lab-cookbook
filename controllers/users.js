const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Community Index Route
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.render('users/index.ejs', {
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


// Show Route
router.get('/:userId', async (req, res) => {
  try {
    const  foundUser = await User.findById(req.params.userId);
    res.render('users/show.ejs', {
      user: foundUser,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});












module.exports = router;