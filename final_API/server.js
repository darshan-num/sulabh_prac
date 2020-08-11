// Create express app
var express = require("express");
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
//var nodemailer = require(‘nodemailer’);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var md5 = require("md5");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
// Server port
const PORT = process.env.PORT || 7000;
// Start server
app.listen(PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", PORT));
});
// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});
/////////////////////////////////////////////////////////////USER TABLE/////////////////////////////////////////////////
// Insert here other API endpoints
//endpoints for api_users table
//Get list of entities- /api/users
app.get("/api/users/", (req, res, next) => {
  var sql = "select * from api_user";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
//Get a single user by id
app.get("/api/users/:id", (req, res, next) => {
  var sql = "select * from api_user where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});
//adding new user-Post request
app.post("/api/users", (req, res, next) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    password: md5(req.body.password),
    username: req.body.username,
    location: req.body.location,
    phone: req.body.phone,
    role: req.body.role,
    email: req.body.email,
  };
  var sql =
    "INSERT INTO api_user (password,username,location,phone,role,email ) VALUES (?,?,?,?,?,?)";
  var params = [
    data.password,
    data.username,
    data.location,
    data.phone,
    data.role,
    data.email,
  ];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});
//Updating user-Patch request
app.patch("/api/users/:id", (req, res, next) => {
  var data = [
    req.body.password,
    req.body.username,
    req.body.location,
    req.body.phone,
    req.body.role,
    req.body.email,
    req.params.id,
  ];
  db.run(
    `UPDATE api_user set
        password = COALESCE(?,password),
        username = COALESCE(?,username),
        location = COALESCE(?,location),
        phone = COALESCE(?,phone),
        role = COALESCE(?,role),
        email = COALESCE(?,email)
        WHERE id = ?`,
    data,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
      });
    }
  );
});
// DELETE Request
app.delete("/api/users/:id", (req, res, next) => {
  db.run("DELETE FROM api_user WHERE id = ?", req.params.id, function (
    err,
    result
  ) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});
///////////////////////////////////////////////////////////////ITEMS TABLE///////////////////////////////////////////
//API End points for items table
//Get list of items
app.get("/items", (req, res, next) => {
  var sql = "select * from items";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
//Get Items by id
app.get("/items/:id", (req, res, next) => {
  var sql = "select * from items where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});
//adding new item-Post request
app.post("/items", (req, res, next) => {
  var errors = [];
  if (!req.body.itemdesc) {
    errors.push("No description given");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    itemdesc: req.body.itemdesc,
    status: req.body.status,
    helper_id: req.body.helper_id,
    reacher_id: req.body.reacher_id,
    price: req.body.price,
    helper_score: req.body.helper_score,
    reacher_score: req.body.reacher_score,
    bargain_price: req.body.bargain_price,
  };
  var sql =
    "INSERT INTO items (itemdesc,status,helper_id,reacher_id,price,helper_score,reacher_score,bargain_price ) VALUES (?,?,?,?,?,?,?,?)";
  var params = [
    data.itemdesc,
    data.status,
    data.helper_id,
    data.reacher_id,
    data.price,
    data.helper_score,
    data.reacher_score,
    data.bargain_price,
  ];
  var item = [
    req.body.itemdesc,
    req.body.status,
    req.body.helper_id,
    req.body.reacher_id,
    req.body.price,
    req.body.helper_score,
    req.body.reacher_score,
    req.body.bargain_price,
    req.params.id,
  ];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      item,
    });
  });
});
//Updating user-Patch request
app.patch("/items/:id", (req, res, next) => {
  var data = [
    req.body.itemdesc,
    req.body.status,
    req.body.helper_id,
    req.body.reacher_id,
    req.body.price,
    req.body.helper_score,
    req.body.reacher_score,
    req.body.bargain_price,
    req.params.id,
  ];
  db.run(
    `UPDATE items set
        itemdesc = COALESCE(?,itemdesc),
        status = COALESCE(?,status),
        helper_id = COALESCE(?,helper_id),
        reacher_id = COALESCE(?,reacher_id),
        price = COALESCE(?,price),
        helper_score = COALESCE(?,helper_score),
        reacher_score = COALESCE(?,reacher_score),
        bargain_price = COALESCE(?,bargain_price)
        WHERE id = ?`,
    data,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
      });
    }
  );
});
// DELETE Request
app.delete("/items/:id", (req, res, next) => {
  db.run("DELETE FROM items WHERE id = ?", req.params.id, function (
    err,
    result
  ) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});
// The API for MATCHING
app.get("/match", (req, res, next) => {
  var sql =
    "select * from api_user JOIN items on api_user.id = items.reacher_id";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

//E-mail Service

app.post("/mail", (req, res, next) => {
  var data = {
    email: req.body.email_id,
  };
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "errands.com2020@gmail.com",
      pass: "mcdonalds123",
    },
  });
  let mailOptions = {
    from: "errands.com2020@gmail.com",
    to: data.email,
    subject: "Your job has been completed!",
    text: "Congratulations! Your job has been completed, do rate your helper! ",
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error Occured", err);
    } else {
      console.log("Email sent!");
    }
  });
  res.json({ message: "Ok" });
});

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});
