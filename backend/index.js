const express = require("express");
const cors = require("cors");

require("./db/config");

const User = require("./db/User");
const Book = require("./db/Book");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      //error handling
      res.send({
        status: 400,
        message: "No user found.",
      });
    }
  } else {
    //error handling
    res.send({
      status: 403,
      message: "Please enter valid username and password",
    });
  }
});

//get all books
app.get("/books", async (req, res, next) => {
  const result = await Book.find();
  if (result.length) {
    res.send(result);
  } else {
    res.send({
      status: 400,
      message: "No book found",
    });
  }
  //   .then((result) => {
  //     res.status(200).json({
  //       bookData: result,
  //     });
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });

  //   res.status(200).json({
  //     msg: "this is book get request",
  //   });
});

//add-book
app.post("/add-book", async (req, res) => {
  const book = new Book(req.body);
  let result = await book.save();
  // result = result.toObject();
  // delete result.password;
  res.send(result);
});

//delete-book
app.delete("/book/:id", async (req, res) => {
  const result = await Book.findByIdAndDelete({ _id: req.params.id });
  console.log("##res", result); // result = result.toObject();
  // delete result.password;
  if (result) {
    res.send(result);
  } else {
    res.send({
      status: 400,
      message: "No book found to delete.",
    });
  }
});

//get-single-book
app.get("/book/:id", async (req, res) => {
  const result = await Book.findById({ _id: req.params.id });
  console.log("##res", result); // result = result.toObject();
  // delete result.password;
  if (result) {
    res.send(result);
  } else {
    res.send({
      status: 400,
      message: "No book found.",
    });
  }
});

//update-single-book
app.put("/book/:id", async (req, res) => {
  const published_date = new Date();
  const { title, url, author, category } = req.body;

  const result = await Book.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title,
        url,
        author,
        published_date,
        category,
      },
    }
  );
  console.log("##res", result); // result = result.toObject();
  // delete result.password;
  if (result) {
    res.send(result);
  } else {
    res.send({
      status: 400,
      message: "Error in updating book.",
    });
  }
});

//search-api
app.get("/search/:key", async (req, res) => {
  let result = await Book.find({
    $or: [
      {
        title: { $regex: req.params.key },
      },
      {
        url: { $regex: req.params.key },
      },
      {
        author: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  res.send(result)
});

app.listen(5000);
console.log("##app running")


