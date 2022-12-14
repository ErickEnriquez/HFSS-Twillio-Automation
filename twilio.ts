import config from './config'
import twilio from 'twilio'
import { getUserSchedule } from './GoogleSheets'
// const googleSheet = require('./googleSheets')

export default {
	//==============================================================================================================
	sendText: async (message: string, recipientNumber: string) => {
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
	parseReceivedBody: async (body: string, recipient: string) => {
		try {
			let output = ''
			//parse the received message
			if (body.match(/Schedule/gi)) {
				const result = await getUserSchedule(recipient)
				if (!result) {
					return 'Unable to get schedule'
				}
				const { staffName, schedule } = result

				output = 'Hello ' + staffName + ' here is your schedule, \n' + schedule
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
				output = 'Debugging'
			}
			else {
				output = 'Thank you for your Response'
			}
			return output
		}
		catch (err) {
			console.error(err)
			throw Error('Unable To Parse Received Body')
		}
	}
}
