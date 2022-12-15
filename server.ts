import express from 'express'
import config from './config'
import twilio from './twilio'
const app = express()
import cors from 'cors'
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//=================================================================================================================================================

app.post('/message', async (req, res) => {
	try {
		const { Body, From }: { Body: string, From: string } = req.body
		const result = await twilio.parseReceivedBody(Body, From)
		res.send(
			`<Response>
				<Message>
				${result}
				</Message>
			</Response>`)
	}
	catch (error) {
		console.error(error)
		res.send(
			`<Response>
				<Message>
				Error Please try again later
				</Message>
			</Response>`
		)
	}
}
)
//=================================================================================================================================================
app.get('/', async (_, res) => {
	try {
		res.status(200).json({ message: 'Server is running' })
	}
	catch (error) {
		console.log(error)
		res.status(200).json({ message: 'Error' })
	}
})

//=================================================================================================================================================

app.listen(config.port, async () => {
	console.log(`Server is live on port:${config.port}`)
})
