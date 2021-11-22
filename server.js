const express = require('express')
const config = require('./config')
const automationHandler = require('./twilio')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())



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
		res.status(400).json({ error })
	}

}
)
//=================================================================================================================================================
app.get('/', async (req, res) => {
	try {
		res.status(200).json({ message: 'Server is running' })
	}
	catch (error) { console.log(error) }
})

//=================================================================================================================================================

var listener = app.listen(config.port, () => {
	console.log(`Server is listening on port ${listener.address().port}`)
})
