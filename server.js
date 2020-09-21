const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const asyncHandler = require("express-async-handler");
const automationHandler = require('./twilio')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//=================================================================================================================================================

app.post("/message", asyncHandler(async (req, res) => {
  res.send("<Response><Message>" + req.body.Body + "</Message></Response>");
  let message = req.body.body;
  let receivedNumber = req.body.From.slice(2); //slice the +1 from the number example +1480-438-6672
  automationHandler.parseReceivedBody(message, receivedNumber)
  // we will need to parse the message that was sent here and then we send it to the function that needs it

})
);
//=================================================================================================================================================
app.get("/", (req, res) => {
  res.send("this is working correctly");
  automationHandler.parseReceivedBody('schedule', '4804386672')
});

//=================================================================================================================================================

var listener = app.listen(config.port, () => {
  console.log("Server is listening on port " + listener.address().port);
});
