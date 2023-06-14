let express = require("express")

let parser = require("body-parser")

const ejs = require("ejs")

const {urlencoded} = require("express");

let app = express()

let _ = require("lodash")

app.use(parser.urlencoded({extended:true}))

app.use(express.static(__dirname+"/public"))


app.set("view engine",'ejs')


const homeStartingContent= "Welcome to My blog! Join us on an inspiring journey through the world of programming and technology. Whether you're a beginner or a seasoned pro, our blog offers valuable insights, practical tips, and thought-provoking articles to fuel your passion. Explore coding, software development, and tech trends with us. Engage, share, and connect with our vibrant community of learners and experts. Unleash your potential and embrace the joy of coding. Get ready to unlock endless possibilities. Welcome to my blog, where knowledge meets innovation. Let's embark on this exciting adventure together!"


const aboutContent = "Welcome to my blog! Here, I share my passion for programming and my journey of continuous learning. Through informative articles, practical tutorials, and insightful discussions, I aim to inspire and guide fellow learners on their programming quests. Join me as we explore various programming languages, frameworks, and best practices. Discover tips for enhancing coding skills, improving productivity, and staying up-to-date with the latest industry trends. Let's delve into the world of technology together, unraveling its wonders and unlocking the potential within us. Whether you're a beginner or an experienced developer, this blog is your go-to resource for expanding your knowledge and mastering the art of programming. Get ready to embark on an exciting adventure of growth and innovation. Welcome to my programming journey!"

const contactContent ="I'd love to hear from you! Whether you have a question, a suggestion, or simply want to connect, don't hesitate to reach out. Feel free to contact me through the provided contact form on this blog, and I'll make sure to get back to you as soon as possible. Your feedback and input are invaluable to me as they help shape the content and direction of this blog. Let's engage in meaningful conversations, share ideas, and support each other on our programming journeys. I look forward to connecting with you!"

let contents=[]

























app.get("/compose",function (req, res) {



    res.render("compose")


})
app.post("/compose",function (req, res) {

    let postTitle= req.body.post
    let postcontent= req.body.content

    let object={Title:postTitle,Content:postcontent}
    contents.push(object)



    res.redirect("/")

})


app.get("/contact",function (req, res) {
    res.render("contact",{cont:contactContent})
})



app.get("/about",function (req, res) {
    res.render("about",{ab:aboutContent})

})



app.get("/",function (req, res) {

    res.render("home",{
        homecontent:homeStartingContent,
        contents:contents,
    })



})

app.get("/posts/:postName",function (req, res) {
    app.use(express.static(__dirname + "/public"));

    const reqtitle= _.lowerCase(req.params.postName)
    contents.forEach(function (item) {
        const storedtitle= _.lowerCase(item.Title)
        if(storedtitle===reqtitle){
            res.render("post",{title:item.Title,content:item.Content})
        }

    })


})



app.listen(3000,function () {
    console.log("Server is running on port 3000")

})