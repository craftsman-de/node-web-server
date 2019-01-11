const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use((req,res,next) => {
    let now = new Date().toString();

     let log = now +':' + req.method + req.url;
    fs.appendFile('server.log', log +'\n', (err) => {
        if(err){
            console.log('unable to append server.log');
        }
    });

    next();
});
// app.use((req,res,next) => {
//   res.render('maintenence.hbs', {
//       maintenence:'PLease come back later'
//   });

// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();

});
app.get('/', (req,res)=>{
    res.render('index.hbs', {
        pageTitle:'Welcome Page',

        welcomeMessage:'Welcome to the train wreck!'
    });
});
app.get('/projects', (req,res) => {
    res.render('projects.hbs', {});
});
app.get('/about', (req,res) =>{
    res.render('about.hbs', { 
        pageTitle:'About Page',

    });
});
app.get('/bad', (req,res) =>{
    res.send('ERROR 101 BITCH');
});
app.listen(port, ()=>{
    console.log('server up on port ' +port);
});