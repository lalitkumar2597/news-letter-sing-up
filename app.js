const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("express/lib/response");
const app = express();
const https = require("https");

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;
    var data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    var jsondata = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/72869a3174";
    const options = {
        method: "POST",
        auth: "lalit:aee63af6800d3c3bbabbae29fbd57c4d-us14"
    }
    

    
   
  const request = https.request(url, options, function(response){
        if(response.statusCode=== 200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
     request.write(jsondata);
     request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})





app.listen(process.env.PORT || 3000, function(){
    console.log("server is running");
});



