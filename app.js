const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

// Use Public folder as a static file folder
app.use(express.static(__dirname + "/public"));
//Use body parser for collecting data from form
app.use(bodyParser.urlencoded({extended:true}));

const PORT = process.env.PORT || 3000;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var url = "https://us11.api.mailchimp.com/3.0/lists/a087dc5c9b";

    var options = {
        method: "POST",
        auth: "zaeden7:61e81b1d3475908656b6c67a342981a8-us11"
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode == 200) {
            res.send("<h1>Its a Success..!!!");
        }
        else {
            res.send("<h1>Oops it is a failure..!!!");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});


app.listen(PORT, function (err) {
    console.log(`Serveris running on port no: ${PORT}`)
}); 

//API Key
// 61e81b1d3475908656b6c67a342981a8-us11

// List Id
// a087dc5c9b