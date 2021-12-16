const config = require('./config')
const ExcelJS = require('exceljs')

async function sendMessage ({ accountSid, authToken, from }, { message, mediaList }) {
	try {
		const names = await readCSV('/Users/erick/Downloads/names.csv')

		const client = require('twilio')(accountSid, authToken)
		names.forEach(name => {
			const msg = client.messages
				.create({
					body: message,
					from: from,
					mediaUrl: mediaList,
					to: name[4]
				}).then(mes => console.log(mes.status)).catch(err => console.log(err, names[4]))
		})
	} catch (error) { console.error(error) }
}

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

sendMessage(
	{ accountSid: config.accountSid, authToken: config.authToken, from: config.sendingNumber },

	{
		message: 'From HFSS' + '\n\n' + 'please send this out to your family' + '\n\n' + 'reply STOP to unsubscribe',
		mediaList: [
			'https://hfss-website.s3.us-west-2.amazonaws.com/now_hiring_2.png',
			'https://hfss-website.s3.us-west-2.amazonaws.com/now_hiring_1.png'
		]
	}
)
