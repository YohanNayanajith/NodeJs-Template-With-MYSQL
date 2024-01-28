const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const userRoute = require("./routes/user");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/user", userRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
