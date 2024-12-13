const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 1801;
app.use(express.json());
//
const userModule = require("./routes/userRoutes");
app.use("/api/users", userModule);

// const taskModule = require("./Routes/taskRoutes");
// app.use("/api/tasks", taskModule);

app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});
//connect to mongoDB
mongoose
  .connect(
    "mongodb+srv://Shubham:shubham4444@cluster.lu6ja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
  )
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDb");
  });
