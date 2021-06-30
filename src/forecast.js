const request=require("request")

const forecast=(longitude,latitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=22f9160740aca206521e8004e15b750c&query="+longitude+","+latitude
    console.log(url)
    request({url: url, json:true}, (error, response)=> {
    if (error){
        callback("Unable to connect to server!",undefined)
    }else if(response.body.error){
        callback("wrong coordinates",undefined)
    }else{
        callback(undefined,"current temperature is " + response.body.current.temperature + " and there is a "+response.body.current.precip+ " percent chance of rain")
    }
    })
}


module.exports=forecast