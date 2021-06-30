const path=require("path")
const express= require("express")
const hbs=require("hbs")
const request=require("request")
const geocode=require("./geocode")
const forecast=require("./forecast")
const { response } = require("express")

const port=process.env.PORT || 3000


const app=express()
const partialsDir=path.join(__dirname, "/partials")

app.set('view engine','hbs')

app.use(express.static(path.join(__dirname, "../public")))
hbs.registerPartials(partialsDir)

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather app",
        name: "Dmitriy"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: "this page will help you. Probably.",
        name:"Dmitriy"
    })
})

app.get("/weather", (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must enter a valid location"
        })
    }
        geocode(req.query.address,(error, response)=>{
            if (error){
                return res.send({error})
            }
            forecast(response.longitude, response.latitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location: response.location,
                    address: req.query.address
                })
            })
        })
    })
   



app.get('*',(req, res)=>{
    res.send("404 page")
})    

app.listen(port, ()=>{
    console.log("Server is up on port "+ port)
})