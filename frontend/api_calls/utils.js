//a simple date formatting function
export const dateFormat = (inputDate, format) => {
  const date = new Date(inputDate)
  const day = date.getDate()
  const year = date.getFullYear()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // document.write("The current month is " + monthNames[d.getMonth()]);
  const month = monthNames[date.getMonth()]

  //replace the month
  format = format.replace("MM", month.toString().padStart(2, "0"))

  //replace the year
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString())
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2))
  }

  //replace the day
  format = format.replace("dd", day.toString().padStart(2, "0"))

  return format
}
