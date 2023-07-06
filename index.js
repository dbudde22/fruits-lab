const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const PORT = process.env.PORT || 3001;

const app = express();

// CODE 
app.use(cors())
app.use(logger('dev'))
// the following middleware comes out of the box with express...
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// ROUTES 
const fruits = ['apple','banana','orange','kumquat','tomato'];
const veggies = ['carrot','broccoli','spinach','radish','peas'];

app.get('/hello', (req, res) => {
    console.log('hello world!')
    res.send('hello world!')
  
  })

app.get('/greet/:name', (req, res) => {
    res.send(`Why hello there, ${req.params.name}`)
})

app.get('/five', (req, res) => {
    const nums = [1,2,3,4,5];
    res.send(nums);
})

app.get('/fruits', (req, res) => {
    res.send(fruits);
})

app.get('/fruits/:name', (req,res, next) => {
    for (i=0; i<fruits.length; i++) {
        if (fruits[i] == req.params.name) {
            res.send(req.params.name);
        }
    }
    next();
})

app.get('/fruits/sort', (req, res) => {
    const sortedFruits = fruits.sort(); 
    res.send(sortedFruits);
})
  
app.get('/veggies', (req, res) => {
    res.send(veggies);
})

app.get('/veggies/:veg', (req,res,next) => {
    for (i=0; i<veggies.length; i++) {
        if (veggies[i] == req.params.veg) {
            res.send(req.params.veg);
        }
    }
    next();
})

// catch-all route
app.get('*', (req, res) => {
    res.send('404 Not Cheese')
  })
  

// BIND TO PORT 
app.listen(PORT, () => console.log(`Serving up delicious fruits on port ${PORT} 🍒`))
