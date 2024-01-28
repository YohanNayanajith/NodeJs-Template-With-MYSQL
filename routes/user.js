const router = require("express").Router();
const db = require("../database/db");
const User = require("../model/User");

// Create a new user
router.post("/create", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const newUser = new User(result.insertId, name, email);
      res.status(201).json(newUser);
    }
  });
});

// Read all users
router.get("/getAll", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const users = results.map(
        (result) => new User(result.id, result.name, result.email)
      );
      res.json(users);
    }
  });
});

//Read one user
router.get("/getUser/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const user =
        result.length > 0
          ? new User(result[0].id, result[0].name, result[0].email)
          : null;
      res.json(user);
    }
  });
});

// Update a user
router.put("/update/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const sql = "UPDATE users SET name=?, email=? WHERE id=?";
  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      const updatedUser = new User(id, name, email);
      res.json(updatedUser);
    }
  });
});

// Delete a user
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

module.exports = router;
