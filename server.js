const express = require('express');
const bodyParser = require('body-parser');
const cfg = require('./config');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.post("/message", (req, res) => {
  console.log(req.body); 
  res.send("<Response><Message>Hello</Message></Response>")
});

app.get("/", (req, res) => {
  res.send("this is working correctly")
});

var listener = app.listen(8080, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

