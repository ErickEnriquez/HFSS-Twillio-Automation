const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const automationHandler = require('./twilio')
const app = express();
const cors = require('cors')
const googleSheet = require("./googleSheets");
app.use(bodyParser.urlencoded({ extended: false }));



//=================================================================================================================================================

app.post("/message", cors() ,  async (req, res) => {
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
app.get("/", async (req, res) => {
  try {
    let result = await googleSheet.staffingAutomationText("4804386672");
    res.send(result)
  }
  catch (error){console.log(error)}
});

//=================================================================================================================================================

var listener = app.listen(config.port, () => {
  console.log("Server is listening on port " + listener.address().port);
});
