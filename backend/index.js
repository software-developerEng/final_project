const express = require("express");
const app = express();
require("dotenv").config();
const mongoDb = require("./configs/mongodb.connection");
const cors = require("cors");
// app.use(cors({origin: true, credentials: true}));
const path = require("path");
app.use(express.static(path.join(__dirname,"public")));
app.use(cors());     
app.use(express.json());
app.use(cors({
  origin:"*",
  methods:['GET']
}))
// ------------------- UPLOADING IMAGES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ------------------- AUTHENTICATION
const authMiddleware = require("./middlewares/auth.middleware");
const authRouter = require("./routes/auth.route");
app.use("/profile", authRouter);



// ------------------- FEATURES
const usersRouter = require("./routes/users.route");
app.use("/users", authMiddleware, usersRouter);



// ------------------- ADMIN
const adminsRouter = require("./routes/admin.route");
app.use("/admin", authMiddleware, adminsRouter);


// ------------------- CONNECTION
app.listen(8000, (err) => {
  if (err) {
    throw err;
  }
  mongoDb();
  console.log("server is running on port: ", 8000);
  //call function seed
});
