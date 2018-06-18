const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://pushpak:5W39slOErOS8e83v@alphacluster-6w2m7.mongodb.net/node-angular?retryWrites=true")
         .then(() => {
           console.log("Connected to database successfully using cluster!")
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

//GET Request
app.get("/api/posts", (req, res, next) => {
  /*const posts = [
    {id:"zzxcxccv7676", title: "Title A", content: "A coming from Server...."},
    {id:"ytetitiu9080", title: "Title B", content: "B coming from Server...."}
  ];*/
  Post.find().then(documents => {
   res.status(200).json({
      message: "Successfully got results in get request..",
      posts:documents
   });
  });
  
});

//adding post route
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
    //commenting after adding post from model
    //const post = req.body;
    post.save();//every model has this save method
    //console.log(post);
    res.status(201).json({
      message: "Post added successfully!"
    });
});

//Deleting list item
app.delete("/api/posts/:id", (req, res, next) => {
   Post.deleteOne({ _id: req.params.id}).then(result => {
     console.log(result);
     res.status(202).json({
      message: "Item deleted !"
    });
   });
});

module.exports = app;
