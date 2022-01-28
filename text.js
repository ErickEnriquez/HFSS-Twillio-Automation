const config = require('./config')
const ExcelJS = require('exceljs')

async function sendMessage ({ accountSid, authToken, from }, { message, mediaList }) {
	try {
		const list = await readCSV('/Users/erick/Downloads/staff_names.csv')
		const client = require('twilio')(accountSid, authToken)
		list.forEach(item => {
			const phoneNumber = String(formatPhoneNumber(item[4]))
			const msg = client.messages
				.create({
					body: message,
					from: from,
					mediaUrl: mediaList,
					to: phoneNumber
				}).then(mes => console.log(mes.status)).catch(err => console.log(err, item[4]))
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

//take the phone numbers from csv file and format them all so twilio can send them all out correctly
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
	{
		accountSid: config.accountSid,
		authToken: config.authToken,
		from: config.sendingNumber
	},

	{
		message: `From HFSS

		Hello HFSS Team, we will be closed Thursday Jan 27th to allow anyone who wishes to attend Ed McHale’s Funeral Service. Please see the attachment for funeral information & other opportunities to gather. An E-vite will follow for a HFSS Staff gathering at Bob & Kathy’s house Thursday evening.
		
		To Opt out reply STOP`,
		mediaList: [
			'https://hfss-website.s3.us-west-2.amazonaws.com/coachEd/Funeral+Schedule.png'
		]
	}
)
