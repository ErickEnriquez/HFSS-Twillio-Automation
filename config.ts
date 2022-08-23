import dotenv from 'dotenv'

export interface configuration {
	port: number
	accountSid: string
	authToken: string,
	sendingNumber: string,
	serviceEmail: string,
	privateKey: string,
	massTextSheetID: string
	goodyearStaffingSheetID: string,
	allStaffIngSheetID: string
}

const config = {} as configuration

dotenv.config()

// HTTP Port to run our web application
config.port = Number(process.env.PORT) || 3000

// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
config.accountSid = process.env.TWILIO_ACCOUNT_SID || ''
config.authToken = process.env.TWILIO_AUTH_TOKEN || ''
config.sendingNumber = process.env.TWILIO_NUMBER || ''
config.serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || ''
config.privateKey = process.env.GOOGLE_PRIVATE_KEY || ''
config.massTextSheetID = process.env.MASS_TEXT_SHEET_ID || ''
config.goodyearStaffingSheetID = process.env.GOODYEAR_STAFFING_FALL2020 || ''
config.allStaffIngSheetID = process.env.STAFFING_AVAILABLE_CURRENT_DATA || ''

const requiredConfig = [
	config.accountSid,
	config.authToken,
	config.sendingNumber,
	config.serviceEmail,
	config.privateKey,
	config.massTextSheetID,
	config.goodyearStaffingSheetID,
	config.allStaffIngSheetID
]
const isConfigured = requiredConfig.every((configValue) => configValue || false)

if (!isConfigured) {
	const errorMessage = 'MISSING TOKENS/CREDENTIALS ENSURE KEYS HAVE BEEN FILLED IN'
	throw new Error(errorMessage)
}

// Export configuration object
export default config