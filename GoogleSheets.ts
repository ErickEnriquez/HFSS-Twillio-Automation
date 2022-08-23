import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'
import config from './config'


export interface schedule {
	staffName: string,
	schedule: string
}
/**
 * given a phone number find the user in the google sheet and return their schedule if possible
 * @param recipient the number in question
 * @returns 
 */
export const getUserSchedule = async (recipient: string): Promise<schedule> => { //staffing automation text to send out schedule 
	try {
		// spreadsheet key is the long id in the sheets URL
		const doc = new GoogleSpreadsheet(config.allStaffIngSheetID)
		doc.useServiceAccountAuth({
			client_email: config.serviceEmail,
			private_key: config.privateKey,
		})

		await doc.loadInfo() // loads document properties and worksheets
		const data = await doc.sheetsByIndex[0].getRows()
		const row = findStaff(data, recipient)
		if (!row) {
			throw Error('Unable to find user')
		}

		const staffName = row['First Name:'] + ' ' + row['Last Name:']
		const schedule = createSchedule(row)
		return { staffName: staffName, schedule: schedule }

	}
	catch (error) {
		console.error(error)
		throw Error('Error getting users schedule')
	}
}

const findStaff = (data: GoogleSpreadsheetRow[], from: string) => {
	return data.find(row => String(row.Phone.replace(/\.|-/g, '').slice(1)) === String(from.slice(2)))
}

const createSchedule = (row: GoogleSpreadsheetRow): string => {
	return (
		isEmptyCell(row['Mon sched'], 'Mon') +
		isEmptyCell(row['Tue sched'], 'Tue') +
		isEmptyCell(row['Wed sched'], 'Wed') +
		isEmptyCell(row['Thu sched'], 'Thu') +
		isEmptyCell(row['Fri sched'], 'Fri') +
		isEmptyCell(row['Sat sched'], 'Sat') +
		isEmptyCell(row['Sun sched'], 'Sun')
	)
}

const isEmptyCell = (str: string, dayOfWeek: string): string => {
	if (!str || 0 === str.length || str.match(/NONE/i)) {
		return ''
	}
	return dayOfWeek + ': ' + str + '\n'
}