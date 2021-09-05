const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const users = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/index', { title: 'Express' });
});

// get register page
router.get('/register', function (req, res, next) {
  // res.render('admin/register', { title: 'Express' });
  res.send(users);
});

// register admin
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.username, password: hashedPassword };
    users.push(user);
    // res.redirect('/');
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  const user = users.find((user) => (user.username = req.body.name));
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
