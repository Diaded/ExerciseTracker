var data=require('./data.js');
var bodyParser= require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data1=  data.data1;

module.exports= function(app){

 app.get('/', function(){
   res.sendFile(__dirname+ './index.html');
 });

 app.get('/api', function(req, res){
   if(req.query.userId!==undefined){
   data1.find({username: req.query.userId}, function(err, data){
     if(data.length===1){
     res.json(data[0]);
   }else{
     res.end('user not found');
   }
   });
 }else{
   res.end("username not found.")
 }
 });

 app.post('/user', urlencodedParser, function(req, res){

  data1.find({username: req.body.username}, function(err, data){
    var num=Math.floor(Math.random()* (1000000000- 100000)+100000);


   if(data[0]===undefined){
     data1({username:req.body.username, id:num}).save();
     res.json({username: req.body.username, id:num});
   }else{
     res.end('username already taken');
   }


  });




 });

app.post('/add', urlencodedParser, function(req, res){
  console.log(req.body.id);
   data1.find({id: parseInt(req.body.id)}, function(err, data){
     console.log(data);

      if(data.length===1){
        data[0].exercise.push({description: req.body.description, duration: req.body.duration, date: req.body.date});
        data1.update({id: req.body.id}, data[0], {upsert:true}, function(){
            console.log('working');
        });
          res.json({username: data[0].username, id: data[0].id, description: req.body.description, duration: req.body.duration, data: req.body.date });
      }else{
        res.end("User-Id doesn't exist");
      }
   });
});


}
