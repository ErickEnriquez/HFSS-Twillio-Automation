var cfg = {};
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;

cfg.serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
cfg.privateKey = process.env.GOOGLE_PRIVATE_KEY
cfg.massTextSheetID = process.env.MASS_TEXT_SHEET_ID
cfg.goodyearStaffingSheetID = process.env.GOODYEAR_STAFFING_FALL2020
cfg.allStaffIngSheetID = process.env.STAFFING_AVAILABLE_CURRENT_DATA

var requiredConfig = [
  cfg.accountSid,
  cfg.authToken,
  cfg.sendingNumber,
  cfg.serviceEmail,
  cfg.privateKey,
  cfg.massTextSheetID,
  cfg.goodyearStaffingSheetID,
  cfg.allStaffIngSheetID 
];
var isConfigured = requiredConfig.every((configValue) => configValue || false);

if (!isConfigured) {
  const errorMessage = 'MISSING TOKENS/CREDENTIALS ENSURE KEYS HAVE BEEN FILLED IN';
  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;