const calculatorForm = document.querySelector(".container form");

const checkLeapYear = (year) => 
    year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)

const checkDate = (date) => {
    const monthDays = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (date.month == 2) {
        if (!monthDays[1].includes(date.day)) return false
        if (date.day == 29) {
            if (!checkLeapYear(date.year)) return false
        }
    }
    if (monthDays[date.month - 1] < date.day) return false

    return true
};

const getBirthDate = () => {
    const birthDay = document.querySelector("#container-input__birth-day").value;
    const birthMonth = document.querySelector("#container-input__birth-month").value;
    const birthYear = document.querySelector("#container-input__birth-year").value;

    return {day: parseInt(birthDay), month: parseInt(birthMonth), year: parseInt(birthYear)}
};

const getGivenDate = () => {
    const givenDay = document.querySelector("#container-input__given-date-day").value;
    const givenMonth = document.querySelector("#container-input__given-date-month").value;
    const givenYear = document.querySelector("#container-input__given-date-year").value;

    return {day: parseInt(givenDay), month: parseInt(givenMonth), year: parseInt(givenYear)}
};

const calculate = () => {
    const birthDate = getBirthDate();
    const givenDate = getGivenDate();

    if (!checkDate(birthDate) || !checkDate(givenDate)) {
        alert("Must be a valid date");
        return
    }

    if (birthDate.year > givenDate.year) {
        alert("Birth year is greater than the given year!");
        return
    }

    let ageDays;
    if (birthDate.day > givenDate.day) {
        givenDate.month = givenDate.month - 1;
        ageDays = (givenDate.day + 30) - birthDate.day;
    } else {
        ageDays = givenDate.day - birthDate.day;
    }

    let ageMonths;
    if (birthDate.month > givenDate.month) {
        givenDate.year = givenDate.year - 1;
        ageMonths = (givenDate.month + 12) - birthDate.month;
    } else {
        ageMonths = givenDate.month - birthDate.month;
    }

    const ageYears = givenDate.year - birthDate.year;
    
    return {years: ageYears, months: ageMonths, days: ageDays}
};

const draw = () => {
    const age = calculate();
    const calculatorScreen = document.querySelector(".container__screen");
    calculatorScreen.innerHTML = `
        <h1>Years: ${age.years}</h1>
        <h1>Months: ${age.months}</h1>
        <h1>Days: ${age.days}</h1>
    `
}

calculatorForm.onsubmit = (event) => {
    event.preventDefault();
    draw();
};