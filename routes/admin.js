const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/index', { title: 'Admin Login', layout: 'adminLayout' });
});

/* GET home page. */
router.get('/register', function (req, res) {
  res.render('admin/register', {
    title: 'Admin Register',
    layout: 'adminLayout',
  });
});

/* GET dashboard page. */
router.get('/dashboard', function (req, res, next) {
  res.render('admin/home', { title: 'Admin Login', layout: 'adminLayout' });
});

/* GET orders page. */
router.get('/orders', function (req, res, next) {
  res.render('admin/orders', { title: 'Admin Orders', layout: 'adminLayout' });
});

/* GET pending page. */
router.get('/pending', function (req, res, next) {
  res.render('admin/pending', {
    title: 'Admin Pending',
    layout: 'adminLayout',
  });
});

/* GET archive page. */
router.get('/archive', function (req, res, next) {
  res.render('admin/archive', {
    title: 'Admin Archive',
    layout: 'adminLayout',
  });
});

/* GET orders page. */
router.get('/declined', function (req, res, next) {
  res.render('admin/declined', {
    title: 'Admin Declined',
    layout: 'adminLayout',
  });
});

/* GET addEvent page. */
router.get('/addEvent', function (req, res, next) {
  res.render('admin/addEvent', {
    title: 'Admin Add Event',
    layout: 'adminLayout',
  });
});

/* GET addEvent page. */
router.get('/event', function (req, res, next) {
  res.render('admin/event', {
    title: 'Admin Event Details',
    layout: 'adminLayout',
  });
});

// // register admin
// router.post('/register', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const admin = new Admin({
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     const newAdmin = await admin.save();
//     res.redirect('/');
//   } catch (error) {
//     // res.rendor('/', {
//     //   errorMessage: 'Error creating',
//     // });
//     console.log(error);
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: 'turnapp_admin' });
    if (await bcrypt.compare(req.body.password, admin.password)) {
      res.redirect('dashboard');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    // res.status(500).send();
    console.log(err);
  }
});

module.exports = router;
