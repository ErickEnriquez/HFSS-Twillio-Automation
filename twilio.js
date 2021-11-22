const config = require('./config')
const twilio = require('twilio')
const googleSheet = require('./googleSheets')

module.exports = {
	//==============================================================================================================
	sendText: async (message, recipientNumber) => {
		const client = twilio(config.accountSid, config.authToken)
		try {
			await client.messages.create({
				body: message,
				from: config.sendingNumber,
				to: recipientNumber,
			})
		} catch (error) {
			console.log(error)
		}
	},
	//==============================================================================================================
	parseReceivedBody: async (body, recipient) => {
		let output = 'Unable to process request'
		//parse the received message
		if (body.match(/Schedule/gi)) {
			console.log('Sending schedule')
			const result = await googleSheet.staffingAutomationText(recipient)
			const { staffName, schedule } = result

			output = staffName ?
				('Hello ' + staffName + ' here is your schedule, \n' + schedule)
				: ('Sorry, unable to find info')

		} else if (body.match(/Subform/gi)) {
			//Send the Sub Form link
			output = 'Please update your SUBBING availability for this season: \nhttps://hubbardswim.typeform.com/to/J9Kfhm'
		} else if (body.match(/Staffing/gi)) {
			//Send the Staffing Link
			output = 'Please complete the staffing request form for the next season: \nhttps://hubbardswim.typeform.com/to/jP5dDs'
		} else if (body.match(/Q12/gi)) {
			output = 'Please complete the Q12 feedback form before October 24th: https://hubbardswim.typeform.com/to/HDyesl#name=xxxxx'
		} else if (body.match(/dseval/gi)) {
			//send the form for desk supervisor eval
		} else if (body.match(/job/gi)) {
			// job application?
		}
		else if (body.match(/test/gi)) {
			output = 'Debuging'
		}
		else {
			output = 'Thank you for your Response'
		}
		return output
	},
}
