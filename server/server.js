const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const database = require('./db/conn')
database()


// Defining Route Gateway
app.use('/records',require('./routes/record'))



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});