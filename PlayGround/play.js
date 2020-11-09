
const x = new Date(Date.now())

const y = new Date()

x.setHours(15)
x.setMinutes(30)
x.setDate(x.getDate() + 1)

console.log(x.getDate())