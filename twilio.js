const config = require("./config");
const twilio = require("twilio");
const googleSheet = require('./googleSheets')

module.exports = {
   sendText: async function (message, recipientNumber) {
        const client = twilio(config.accountSid, config.authToken);
        try {
            await client.messages
                .create({
                    body: message,
                    from: config.sendingNumber,
                    to: recipientNumber,
                })
        }
        catch (error) {
            console.log(error)
        }
    },
    parseReceivedBody: (body, recipient) => { //parse the received message 
        if (body.match(/Schedule/gi)) {
            return googleSheet.goodyearAutomationText(recipient)
        }
    }
}