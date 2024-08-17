//express module import
const express = require('express');
const app = express(); //create an instanse of an express aplication
const port = 3001; // define the port on which server will listen

// Middleware to parse JSON bodies in POST requests 
app.use(express.json());

//our GET route
app.get('/', (req, res) =>{
    res.send('node Server is running!');
})

//POST route to recive data form angular weather app
app.post('',(req, res)=>{
    const cityData = req.body;
    console.log('recived Data ', cityData);

  // Here you would save the data to your server or database
  // For example, save cityData to a file or database

  res.status(200).send({ message: 'City data received successfully!' });
})

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });