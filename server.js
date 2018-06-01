const express = require('express');
const hbs = require('hbs');
const fs=require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials/');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log+'\n', (err) => {
    if(err){
      console.log('Unable to reach the server');
      app.use((req,res,next) => {
        res.render('maintenance.hbs');
      });
      next();
    }
    else{
      next();
    }
  });

});


hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {

  //res.send('<h1>Hello express</h1>');
  /*res.send({
    name : 'Srikant',
    likes: ['biking','watchingTV']
  });*/
  res.render('welcome.hbs',{
    PageTitle: 'Welcome Page',
    description: 'Welcome to my first website',
    //CurrentYear: new Date().getFullYear(),
    welcomepage: 'Number1 Website'
  });
});

app.get('/about',(req,res) =>{
  //res.send("<h1>About Page</h1>");
  res.render('about.hbs', {
    PageTitle : 'About Page',
    //CurrentYear: new Date().getFullYear()
  });
});

app.get('/error',(req,res) => {
  res.send({
    statusCode : 404,
    errorMessage : 'Page Not Found'
  });
});
app.listen(port, () => {
  console.log(`Server is up in port ${port} !`);
});
