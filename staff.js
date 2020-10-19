module.exports = {
  findStaff: (data, phoneNumber) => {
    for (let i = 0; i < data.length; i++) {
      let formattedPhoneNumber = data[i].Phone;
      try {
        formattedPhoneNumber = data[i].Phone.replace(/\.|\-/g, ""); // replace all . and - in phone numbers
        if (formattedPhoneNumber == phoneNumber) {
          return data[i];
        }
      } catch (err) {}
    }
    return false;
  },
  createSchedule: function (row) {
    return (
      this.isEmpty(row["Mon sched"], "Mon") +
      this.isEmpty(row["Tue sched"], "Tue") +
      this.isEmpty(row["Wed sched"], "Wed") +
      this.isEmpty(row["Thu sched"], "Thu") +
      this.isEmpty(row["Fri sched"], "Fri") +
      this.isEmpty(row["Sat sched"], "Sat") +
      this.isEmpty(row["Sun sched"], "Sun")
    );
  },
  //Check the data passes and return if only if not empty or filled with None
  isEmpty: function (str, dayOfWeek) {
    if (!str || 0 === str.length || str.match(/NONE/i)) {
      return "";
    }
    return dayOfWeek + ": " + str + "\n";
  },
};
