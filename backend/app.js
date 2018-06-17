const express = require('express');
const bodyparser = require('body-parser');
var mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();


mongoose.connect('mongodb://localhost:27017/node-angular')
         .then(() => {
           console.log("Connected to database successfully")
         })
         .catch(() => {
          console.log("Connection Failed!");
         }); 

/*app.use((req, res, next) => {
   console.log("In 1st middleware.");
   next();
});*/
//Setting headers for client and server to communicate
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : false }))

app.use((req, res, next) => {
     //In setheader method, first parameter is identifier and second is value
     res.setHeader("Access-Control-Allow-Origin", "*");
     //added s to Header
     res.setHeader("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type,  Accept");
     res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
     //forgot to add next(), caused error as request will not be forwarded. adding now.
     next(); // a must needed method here other wise request will not be forwarded.
});

//adding post route
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
    //commenting after adding post from model
    //const post = req.body;
    console.log(post);
    res.status(201).json({
      message: "Post added successfully!"
    });
});

app.use("/api/posts", (req, res, next) => {
   const posts = [
     {id:"zzxcxccv7676", title: "Title A", content: "A coming from Server...."},
     {id:"ytetitiu9080", title: "Title B", content: "B coming from Server...."}
   ];
   res.status(200).json({
     message: "Successfully got results.. buts oops! it/'s hardcoded!",
     posts:posts
   });
 });

 module.exports = app;