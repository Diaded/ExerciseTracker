var express=require('express');
var controller= require('./controller');
var session= require('express-session');

var app= express();

app.use(express.static('./public'));

controller(app);

app.listen(3000, function(){
  console.log('working')
});
