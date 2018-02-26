var express = require('express');
var morgan = require('morgan');
var path = require('path');


var Pool =require('pg').Pool;

var config ={
    user:'adityaghoshsbg',
    database :'adityaghoshsbg',
    host :'db.imad.hasura-app.io',
    port:'5432',
    password:'db-adityaghoshsbg-72927'
};

var app = express();
app.use(morgan('combined'));



app.get('/', function (req, res) {
    
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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

var articles = {
    
    
   'article-one': {
        title: 'Article one',
        heading: 'Article one',
        date: ' 16 feb 2018',
        content: `<p class="container">    this is arcticle one    
     this is arcticle one this is arcticle one this is arcticle one this is arcticle one </p> `,
    },
    
    'article-two': {
        title: 'Article two',
        heading: 'Article two',
        date: ' 17 feb 2018',
        content: `<p class="container">    this is arcticle two    this is arcticle two  this is arcticle two  this is arcticle two  this is arcticle two  this is arcticle two   
     </p> `,

    },

    'article-three' :{
        title: 'Article three',
        heading: 'Article three',
        date: ' 16 feb 2018',
        content: `<p class="container">    Article threeArticle threeArticle threeArticle threeArticle three </p> `,
    },


};


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

 pool.query("select * from article where title = $1",[req.params.articleName], function(err , result ){
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
