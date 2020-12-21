const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const automationHandler = require('./twilio')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});// proxy request to avoid cors error

//=================================================================================================================================================

app.post("/message", async (req, res) => {
  let message = req.body.Body;
  let receivedNumber = req.body.From.slice(2); //slice the +1 from the number example +1480-438-6672
  try {
    let result = await automationHandler.parseReceivedBody(message, receivedNumber)
    res.send("<Response><Message>" + result + "</Message></Response>");
}
  catch (error){console.log(error)}

}
);
//=================================================================================================================================================
app.get("/",  (req, res) => {
  try {
    res.send('Server is live')
  }
  catch (error){console.log(error)}
});

//=================================================================================================================================================

var listener = app.listen(config.port, () => {
  console.log("Server is listening on port " + listener.address().port);
});
