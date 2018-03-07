var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');

var Pool =require('pg').Pool;
var bodyParser = require('body-parser');

var config ={
    user:'adityaghoshsbg',
    database :'adityaghoshsbg',
    host :'db.imad.hasura-app.io',
    port:'5432',
    password:'db-adityaghoshsbg-72927'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());  



app.get('/', function (req, res) {
    
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
function hash(input,salt){
      var hashed = crypto.pbkdf2Sync(input ,salt,10000,512,'sha512');
      return ['pbkdf2', "10000",hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
 var hashedString = hash(req.params.input,'this-is-some-randon-string');
 res.send(hashedString);
});
    
    
app.post ('/create-user', function(req, res){
    // username , password 
    
    var  username = req.body.username;
    var password = req.body.password; 
    var salt = crypto.RandomBytes(128).toString('hex');
    var dbString =hash(password ,salt );
    pool.query('INSERT INTO "user" (username , password) VALUES ($1 , $2) ',[username , dbString], function(err , result ){
        if(err){
            res.status(500).send(err.toString());
            
        }
        else{
            res.send('User successfully created '+username )  ;
        }
        
    });
    
});

var pool = new Pool(config);

app.get('/test-db' , function(req , res){
    //make a select request 
    // return a request 
    
    pool.query('select * from test' , function(err , result){
       
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           res.send(JSON.stringify(result));
       }
       
    });
    
});




function createTemplate (data){
    
        var title = data.title;
        var heading = data.heading;
        var date = data.date;
        var content = data.content;
        
        var htmltemplate=`<html>
    <head>
    
    <title>  ${title} </title>
    <link href="ui/style.css" rel="stylesheet" /> 
    
    </head>
    <body>
        <div> 
            <a href='/'>Home </a> 
        </div>
            <h3> ${heading}</h3>
        <div > 
            <p>  ${date.toDateString()}</p>
        </div>
       ${content}
    </body>
    </html> `;
    
        return htmltemplate;
    }
    
    
app.get('/articles/:articleName', function (req , res){
//var articleName=   req.params.articleName;

 pool.query("select * from article where title =$1",[req.params.articleName], function(err , result ){
    if(err){
        res.status(500).send(err.toString());
    }
    
    else{
        if(result.rows.lenght === 0){
            
            res.status(404).send("file not found");
        }
        else {
            articleData = result.rows[0];
              res.send(createTemplate(articleData));
        }
    }
    
    
    });


});




app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
