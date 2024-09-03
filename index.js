"use strict"

const express = require('express');
const app = express();
const port = 3000;

//Setting up the view engine to EJS
app.set('view engine', 'ejs');

// Serve static(local files) files || CSS
app.use(express.static('public'));

// Custom middleware to verify the time of the request
const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const day = date.getDate();
    const hour = date.getHours();

    // Check if the request is within working hours (Monday to Friday, 9 to 17)
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.status(403).send('Website is unavailable outside working hours.')
    }
}

app.use(checkWorkingHours);

// Define routes
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/services', (req, res) => {
    res.render('services');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});