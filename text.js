const config = require('./config')


async function sendMessage ({ accountSid, authToken, from }, to) {
	try {
		const client = require('twilio')(accountSid, authToken)
		await client.messages
			.create({
				body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
				from: from,
				mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
				to: to
			})
	} catch (error) { console.error(error) }
}

sendMessage({ accountSid: config.accountSid, authToken: config.authToken, from: config.sendingNumber }, '4804386672')
