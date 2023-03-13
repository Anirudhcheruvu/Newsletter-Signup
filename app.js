

const bodyparser = require("body-parser");
const { response } = require("express");
const express= require("express");
const request   = require("request");
const https= require("https");

const app = express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res)
{
res.sendFile(__dirname+"/signup.html");
});





app.post("/",function(req,res)
{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email= req.body.email; 
    
    const data={
        members:[
            {   email_address:email,
                status:"subscribed",
                merge_fields:
                {
                    FNAME:firstName,
                    LNAME:lastName
                }

            }
        ]
    }
    const url = "https://us14.api.mailchimp.com/3.0/lists/6e385db248";
    const jasondata=JSON.stringify(data);
    const options = {
        method:"POST",
        auth:"stellarboy:be2eefa95646b740a3c3ecbf053ed72e-us14"
    };
const request = https.request(url,options,function(response)
{
    if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data)
    {
        console.log(JSON.parse(data));
    });
});

request.write(jasondata);
request.end();
});


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.");

});

// api key : be2eefa95646b740a3c3ecbf053ed72e-us14

// audience ID : 6e385db248


//