require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT ;
const Mongurl = process.env.MONGODB_URI;
const weatherRoute = require('./Routes/weatherRoute');


app.set("view engine", "ejs");
app.use(express.json());                            // this is for json data which is sent from the client side
app.use(express.urlencoded({ extended: true }));  // this is for form input data , main dfference between json and form input data is that json data is sent in the body of the request and form input data is sent in the url of the request



app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});




app.use('/', weatherRoute);


app.listen(PORT, () => {
  console.log(
    `port running successfully at port ${PORT}`
  )
})

// Connect to MongoDB
mongoose.connect(Mongurl)
.then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})