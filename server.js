const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const staff = require("./staff");
const twilio = require("twilio");

// spreadsheet key is the long id in the sheets URL
const { GoogleSpreadsheet } = require("google-spreadsheet");
const asyncHandler = require("express-async-handler");
const cfg = require("./config");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
//=================================================================================================================================================
function  sendText(message, recipientNumber) {
  const client = twilio(cfg.accountSid, cfg.authToken);
  client.messages.create({
    body: message,
    from: cfg.sendingNumber,
    to: recipientNumber,
  }).then(message => console.log(message.sid)).catch(error,console.log(error))
}

//=================================================================================================================================================

app.post("/message",asyncHandler(async (req, res) => {
  res.send(
      "<Response><Message>" + req.body.Body + "</Message></Response>"
    );
    let message = req.body.body;
    let receivedNumber = req.body.From;
    // we will need to parse the message that was sent here and then we send it to the function that needs it
  })
);
//=================================================================================================================================================
app.get("/", (req, res) => {
  res.send("this is working correctly");
});

app.get("/goodyearStaffing",asyncHandler(async function (req, res) {
    // spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(config.goodyearStaffingSheetID);
    doc.useServiceAccountAuth({
      client_email: config.serviceEmail,
      private_key: config.privateKey,
    });
    await doc.loadInfo(); // loads document properties and worksheets
    const data = await doc.sheetsByIndex[0].getRows();
    const row = staff.findStaff(data, "4804386672"); // temporary phone number for now should be gotten from twilio when user sends request
    const staffName = row["First Name:"] + " " + row["Last Name:"];
    const schedule = staff.createSchedule(row);
    console.log(schedule);
    res.send(staffName);
  })
);
//=================================================================================================================================================

var listener = app.listen(config.port, () => {
  console.log("Server is listening on port " + listener.address().port);
});
