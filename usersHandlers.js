const database = require("./database");

  const getUser = (req, res) => {
    database
    .query("select * from user")
    .then(([user]) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
  };

  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from user where id = ?", [id])
      .then(([user]) => {
        if (user[0] != null) {
          res.json(user[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const postUserCreation = (req, res) => {
    const { FirstName, LastName } = req.body;

    database
      .query(
        "INSERT INTO user(FirstName, LastName) VALUES (?, ?)",
        [FirstName, LastName]
      )
      .then((result) => {
        const userId = result.insertId;
        res.status(201).json({ id: userId, message: "User created successfully"});
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error inserting data into databse");
      });
  };

  
  module.exports = {
    getUser,
    getUserById,
    postUserCreation,
  };