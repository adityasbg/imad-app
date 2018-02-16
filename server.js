var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
    
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var articleOne ={
    title:'Article one',
    heading:'Article one',
    date :' 16 feb 2018',
    content :`<p class="container">    this is arcticle one    

     this is arcticle one this is arcticle one this is arcticle one this is arcticle one </p> ` 
};

function createTemplate (data){
    
        var title = data.title;
        var heading = data.heading;
        var date = data.date;
        var content = data.content;
        
        var htmltemplate=`<html>
    <head>  <title>  ${title} </title>
    <link href="ui/style.css" rel="stylesheet" /> 
    
    </head>
    <body>
        <div> 
            <a href='/'>Home </a> 
        </div>
            <h3> ${heading}/h3>
        <div > 
            <p>  ${date}</p>
        </div>
       ${content}
    </body>
    </html> `;
    
        
        return htmltemplate;
    }



app.get('/article-one', function (req , res){
  //res.sendFile(path.join(__dirname, 'ui','article-one.html'));
  
  res.send(createtemplate(data));
});

app.get('/article-two', function(req, res){
    res.sendFile(path.join(__dirname, 'ui' , 'article-two.html'));
    
});

app.get('/article-three', function(req, res){
    res.sendFile(path.join(__dirname ,'ui', 'article-three.html'));
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
