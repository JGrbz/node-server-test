//nodemon server.js -e js,hbs

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');  //Sets up partials, takes argument directory to use
                                                      //Partial is simply a function you run within handlebars template
app.set('view engine', 'hbs'); //Declare view engine: arguments key value pair: key to set, value to set as


app.use((req, res, next) => { //next argument says when middleware is done
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log) //Will tell us date request happened, what method, and what URL
  fs.appendFile('server.log', log + '\n', (err) => {  //Writes to server.log, appends log info and goes next line, requires callback function
      if (err) {
        console.log('Unable to append server.log')
      }
  });
  next(); //need to call to end
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public')); //app.use registers middleware, takes function, middleware executes in order

hbs.registerHelper('getCurrentYear', () => {  //Can now use getCurrentYear in handlebars template without having to make function each time
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => { //'text' is argument that gets passed in by template
    return text.toUpperCase();
});

// app.get('/', (req, res) => {  //Req stores info about request coming in, res responds to http request
//   // res.send('<h1>Hello Express!</h1>');
//      res.send({
//        name: 'Joe',
//        likes: [
//           'Photography',
//           'Food'
//        ]
//      });
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the site!'
  });
});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {  //Add in dynamic stuff to render
    pageTitle: 'About Page',  //render pages set up with whatever view engine
  });
});

app.get('/bad', (req, res) => {
  res.send({
      errorMessage: 'YA BLEW IT'
  });
})

app.listen(3000, () => {  //List can can take second optional argument
  console.log(`Server is up on port ${port}`);
});
