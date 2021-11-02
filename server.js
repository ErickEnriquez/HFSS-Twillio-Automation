const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const automationHandler = require('./twilio')
const app = express()
const cors = require('cors')

app.use(cors())

const googleSheet = require('./googleSheets')
app.use(bodyParser.urlencoded({ extended: false }))



//=================================================================================================================================================

app.post('/message', async (req, res) => {
	try {
		const message = req.body.Body
		const receivedNumber = req.body.From
		const result = await automationHandler.parseReceivedBody(message, receivedNumber)
		res.send(
			`<Response>
				<Message>
				${result}
				</Message>
			</Response>`)
	}
	catch (error) {
		console.log(error)
		res.send(400).json({ error })
	}

}
)
//=================================================================================================================================================
app.get('/', async (req, res) => {
	try {
		let result = await googleSheet.staffingAutomationText('+17122231014')
		//res.send({ result: 'live' })
		res.send(result)
	}
	catch (error) { console.log(error) }
})

//=================================================================================================================================================

var listener = app.listen(config.port, () => {
	console.log(`Server is listening on port ${listener.address().port}`)
})
