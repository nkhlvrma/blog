//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to Daily Blog. Use this site as your safe space to write your heart out.";
const aboutContent = "As more and more people come online, safe non-judgemental spaces are increasingly becoming difficult to find. Hence why this project was initiated t0 provide a safe space to all the people who want to express their thought without any fear of getting cancelled.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    homeContent: homeStartingContent, 
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  
  res.redirect("/");

});

app.get("/posts/:postName", function (req, res){
  const requestedTitle =_.lowerCase(req.params.postName); 

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    
    if(storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
  
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
