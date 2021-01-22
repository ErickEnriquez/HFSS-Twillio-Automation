# HFSS SMS Automation
This is a project for HFSS to handle Automation rules using Twilio and incorporating Google's various APIs

### Requirements
Node >= 12.18.2

### Usage

This app handles various different types of automation rules from sending schedules to sending urls

### OAuth2 
Ensure that you add the service email to the list of editors in share settings for whatever file you want to include in this project as well as adding ID onto Heroku config vars

## deployment
this app is deployed on heroku at [url](https://hfss-twilio-server.herokuapp.com/). 

### dependencies used
[google sheets](https://www.npmjs.com/package/google-spreadsheet)

[express](https://www.npmjs.com/package/express)

[express-async-handler](https://www.npmjs.com/package/express-async-handler)

[twilio](https://www.npmjs.com/package/twilio)

[body-parser](https://www.npmjs.com/package/body-parser)

[googleapis](https://www.npmjs.com/package/googleapis)
