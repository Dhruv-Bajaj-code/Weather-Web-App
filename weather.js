const express=require("express");
const bodyParser = require("body-parser");
const https=require("https");

const app2=express();


app2.set("view engine", "ejs");
app2.use(express.static("public"));




app2.use(bodyParser.urlencoded({extended:true}));



app2.get("/",(res,req)=>{
    req.sendFile(__dirname+'\\'+'Weather.html')

})
app2.post("/",(req,res)=>{
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&appid={apiKey}",(responce)=>{
       
        responce.on("data",(d)=>{
            console.log(JSON.parse(d));
            res.render('wether1',{City:req.body.city,Temperature:JSON.parse(d).main.temp,WeatherDescription:JSON.parse(d).weather.description,icon:"https://openweathermap.org/img/wn/"+JSON.parse(d).weather[0].icon+"@2x.png"})
            // res.write("<h1>"+JSON.parse(d).main.temp_min+"</h1>");
            const link="https://openweathermap.org/img/wn/"+JSON.parse(d).weather[0].icon+"@2x.png";
            // res.write("<body><img src='"+link+"' width='500px' height='600px'></body>");
            // res.send()
        });
        });
})
app2.listen("3000");

// app.listen(3000);