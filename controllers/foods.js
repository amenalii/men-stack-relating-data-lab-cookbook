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
router.delete('/:itemId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.pantry.id(req.params.itemId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
});

// Update Route
router.put('/:itemId', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id);
      const pantryItem = currentUser.pantry.id(req.params.itemId);
      pantryItem.set(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
});

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
router.get('/:itemId/edit', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id);
      const pantryItem = currentUser.pantry.id(req.params.itemId);
      res.render(`foods/edit.ejs`, { pantry: pantryItem });
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
});

module.exports = router;
