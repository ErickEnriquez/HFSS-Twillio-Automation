const config = require("./config");
const twilio = require("twilio");
const googleSheet = require("./googleSheets");

module.exports = {
  sendText: async (message, recipientNumber) => {
    const client = twilio(config.accountSid, config.authToken);
    try {
      await client.messages.create({
        body: message,
        from: config.sendingNumber,
        to: recipientNumber,
      });
    } catch (error) {
      console.log(error);
    }
  },
  parseReceivedBody: async (body, recipient) => {
    let output = "Unable to process request";
    //parse the received message
      if (body.match(/Schedule/gi)) {
          if (recipient.slice(0, 2) == '+1') {
              recipient = recipient.slice(2); //slice off the +1
          }
      let result = await googleSheet.goodyearAutomationText(recipient);
      if (result.staffName == false) {
        output = result.schedule; //sorry unable to find info
      } else {
        output =
          "Hello " +
          result.staffName +
          " here is your schedule\n" +
          result.schedule;
      }
    } else if (body.match(/Subform/gi)) {
      //send the subform link
    } else if (body.match(/Staffing/gi)) {
      output = 'Please complete the staffing request form for the next season\: \nhttps\:\/\/hubbardswim.typeform.com\/to\/jP5dDs'
    } else if (body.match(/Q12/gi)) {
      //send the q12 evaluation
    } else if (body.match(/dseval/gi)) {
      //send the form for desk supervisor eval
    } else if (body.match(/job/gi)) {
      // job application?
      }
      else if (body.match(/test/gi)) {
          output = "Debuging"
      }
      else{
        output = "Thank you for your Response"
      }
    return output;
  },
};
