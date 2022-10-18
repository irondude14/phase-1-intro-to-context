// Your code here
function createEmployeeRecord(array) {
    const employeeRecord = {};
    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord;
}

function createEmployeeRecords(array) {
    let records = array.map(record => {
            return createEmployeeRecord(record);
        })
    return records
}

// Function passing an object and dateStamp as arguments;
// object is employeeRecord's object w/ pre-existing keys timeInEvents & timeOutEvents as empty arrays; 
// dateStamp is a string in "YYYY-MM-DD HHMM" format;
// Empty object needs to be created w/ keys "type", "hour", "date"; data should be taken from dateStamp;
// Empty object is pushed into object's timeInEvents array;
// Function returns updated employeeRecord's object;

function createTimeInEvent(object, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    object.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time, 10),
    date: date,
    });
    return object;
}

function createTimeOutEvent(object, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date,
        });
    return object;
}

// Function passing an object and date as arguments;
// object is employeeRecord's object; date is a string;
// compares date argument to date keys in timeIn & timeOut in object
// if matches date matches in both entrees, grabs hour keys from timeIn & timeOut, 
// substructs hour value in timeIn from hour value in timeOut, 
// returns result as integer;

function hoursWorkedOnDate(object, date) {
    const hoursIn = () => {
        for (const timeEntreeIn of object.timeInEvents) {
                if (date === timeEntreeIn.date) {
                    return timeEntreeIn.hour
                }
            }   
        }
    const hoursOut = () => {
        for (const timeEntreeOut of object.timeOutEvents) {
                    if (date === timeEntreeOut.date) {
                        return timeEntreeOut.hour
                }
            } 
        }
    let hoursWorked = (hoursOut() - hoursIn());
    let numOfHours = hoursWorked.toString().substring(0, hoursWorked.toString().length - 2);
    return parseInt(numOfHours)           
}

// Function that passing and object and date as arguments; 
// object is employeeRecord's object; date is a string;
// I need to return object.payPerHour multiplied by hoursWorkedOnDate(object, date)

function wagesEarnedOnDate(object, date) {
    let hoursWorked = hoursWorkedOnDate(object, date);
    let pay = object.payPerHour;
    let wages = pay * hoursWorked;
    return wages;
}

// Function that passes object as argument;
// object is employeeRecord's object;
// we need to use wagesEarnedOnDate() to grab weages earned per person;
// we need to go thru all entrees in timeInEvents & timeOutEvents;
// we need to store/push all wages into the array;
// use reduce to add all elements of the array;

function allWagesFor(object) {
    const dates = []
        for (const timeEntreeIn of object.timeInEvents) {
            dates.push(timeEntreeIn.date)
        };
    let allWages = dates.reduce((previousValue, currentValue) => previousValue + wagesEarnedOnDate(object, currentValue), 0)
    return allWages;
    // const daysWorked = object.timeInEvents.map( e => e.date);
    // const pay = daysWorked.reduce((previousValue, currentValue) => previousValue + wagesEarnedOnDate(object, currentValue), 0);
    // return pay;
}

// 

function calculatePayroll(array) {
    let allWages = []
    for (const elem of array) {
        allWages.push(allWagesFor(elem))
    }
    let total = allWages.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    return total
}