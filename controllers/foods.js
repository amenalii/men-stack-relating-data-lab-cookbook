const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

/*------------------------------------------------ROUTES------------------------------------------------*/

// Index Route
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("foods/index.ejs", {
      pantry: currentUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// New Route
router.get("/new", async (req, res) => {
  res.render("foods/new.ejs");
});

// Delete Route

// Update Route

// Create Route
router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Edit Route

// Show Route

module.exports = router;
