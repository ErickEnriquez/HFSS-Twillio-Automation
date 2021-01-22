const { GoogleSpreadsheet } = require("google-spreadsheet");
const config = require("./config");
const staff = require("./staff");

module.exports = {
//==============================================================================================================
  goodyearAutomationText: async recipient => {// Deprecated, do not use
    // spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(config.goodyearStaffingSheetID);
    doc.useServiceAccountAuth({
      client_email: config.serviceEmail,
      private_key: config.privateKey,
    });
        try {
            await doc.loadInfo(); // loads document properties and worksheets
            const data = await doc.sheetsByIndex[0].getRows();
            const row = staff.findStaff(data, recipient); 
          if (row == false) {
            return { staffName: false, schedule: 'Sorry could not find info' }
          }
          else {
            const staffName = row["First Name:"] + " " + row["Last Name:"];
            const schedule = staff.createSchedule(row);
            return { staffName: staffName, schedule: schedule }
          }
        }
        catch (error) {
            console.log(error);
        }
  },
//==============================================================================================================
  staffingAutomationText: async recipient => { //staffing automation text to send out schedule 
    // spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(config.allStaffIngSheetID);
    doc.useServiceAccountAuth({
      client_email: config.serviceEmail,
      private_key: config.privateKey,
    });
        try {
            await doc.loadInfo(); // loads document properties and worksheets
            const data = await doc.sheetsByIndex[0].getRows();
            const row = staff.findStaff(data, recipient); 
          if (row == false) {
            return { staffName: false, schedule: 'Sorry could not find info' }
          }
          else {
            const staffName = row["First Name:"] + " " + row["Last Name:"];
            const schedule = staff.createSchedule(row);
            return { staffName: staffName, schedule: schedule }
          }
        }
        catch (error) {
            console.log(error);
        }
  },
};
