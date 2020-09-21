const { GoogleSpreadsheet } = require("google-spreadsheet");
const config = require("./config");
const staff = require("./staff");

module.exports = {
  goodyearAutomationText: async recipient => {
    // spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(config.goodyearStaffingSheetID);
    doc.useServiceAccountAuth({
      client_email: config.serviceEmail,
      private_key: config.privateKey,
    });
        try {
            await doc.loadInfo(); // loads document properties and worksheets
            const data = await doc.sheetsByIndex[0].getRows();
     
            const row = staff.findStaff(data, recipient); // temporary phone number for now should be gotten from twilio when user sends request
            const staffName = row["First Name:"] + " " + row["Last Name:"];
            const schedule = staff.createSchedule(row);
            console.log(staffName)
            return {staffName : staffName , schedule: schedule}
        }
        catch (error) {
            console.log(error);
        }
    },

};
