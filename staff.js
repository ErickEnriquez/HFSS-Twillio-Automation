module.exports = {
	//==============================================================================================================
	findStaff: (data, phoneNumber) => {
		return new Promise((resolve, reject) => {
			//let found = false
			data.forEach((row) => {
				const formattedNumber = row.Phone.replace(/\.|-/g, '').slice(1)

				if (String(formattedNumber) === String(phoneNumber.slice(2))) {
					console.log(`found match with ${formattedNumber}`)
					console.log(row)
					found = true
					return row
				}
			})
		})
	},
	//==============================================================================================================
	createSchedule: function (row) {
		return (
			this.isEmpty(row['Mon sched'], 'Mon') +
			this.isEmpty(row['Tue sched'], 'Tue') +
			this.isEmpty(row['Wed sched'], 'Wed') +
			this.isEmpty(row['Thu sched'], 'Thu') +
			this.isEmpty(row['Fri sched'], 'Fri') +
			this.isEmpty(row['Sat sched'], 'Sat') +
			this.isEmpty(row['Sun sched'], 'Sun')
		)
	},
	//==============================================================================================================
	//Check the data passes and return if only if not empty or filled with None
	isEmpty: function (str, dayOfWeek) {
		if (!str || 0 === str.length || str.match(/NONE/i)) {
			return ''
		}
		return dayOfWeek + ': ' + str + '\n'
	},
}
