const config = require('./config')
const ExcelJS = require('exceljs')

async function sendMessage ({ accountSid, authToken, from }, { message, mediaList }) {
	try {
		const list = await readCSV('/Users/erick/Downloads/names.csv')

		const client = require('twilio')(accountSid, authToken)
		list.forEach(item => {
			const phoneNumber = String(formatPhoneNumber(item[3]))
			const msg = client.messages
				.create({
					body: message,
					from: from,
					mediaUrl: mediaList,
					to: phoneNumber
				}).then(mes => console.log(mes.status)).catch(err => console.log(err, item[3]))
		})
	} catch (error) { console.error(error) }
}

//read the data from the csv file using exceljs and return a list with names as well as phone numbers
const readCSV = async (filePath) => {
	const workbook = new ExcelJS.Workbook()
	const sheet = await workbook.csv.readFile(filePath)
	let data = []
	sheet.eachRow((row, num) => {
		if (num !== 1) {
			data = [...data, row.values]
		}
	})
	return data
}

//take the phone numbers from csv file and format them all so twillio can send them all out correctly
const formatPhoneNumber = (str) => {
	//Filter only numbers from the input
	let cleaned = ('' + str).replace(/\D/g, '')

	//Check if the input is of correct length
	let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}

	return str
}

sendMessage(
	{ accountSid: config.accountSid, authToken: config.authToken, from: config.sendingNumber },

	{
		message: 'From HFSS' +
			'\n\n' + 'Referral bonus for YOU! Earn up to $300 by referring a friend! we need staff ready to start in January! Tell them to apply now. Share on social media, send the info to all your amazing friends and/or family.' + '\n\n' + 'More details on referral bonus' + '\n\n' + 'Continuous interview - $50' + '\n' + 'Hired - $50' + '\n3 Months $100\n6 Months - $100' + '\n\n' + 'reply STOP to unsubscribe',
		mediaList: [
			'https://hfss-website.s3.us-west-2.amazonaws.com/now_hiring_2.png',
			'https://hfss-website.s3.us-west-2.amazonaws.com/now_hiring_1.png'
		]
	}
)
