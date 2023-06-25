const calculatorForm = document.querySelector(".container form");

const isLeapYear = (year) => 
    year % 4 == 0 || (year % 100 == 0 && year % 400 == 0);

const isValidDate = (date) => {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const {year, month, day} = date;

    if (month == 2) {
        const maxDays = isLeapYear(year) ? 29 : 28;
        if (day > maxDays) return false;
    } else {
        if (day > monthDays[month - 1]) return false;
    }

    return true;
};

const getBirthDate = () => {
    const birthDay = document.querySelector("#container-input__birth-day").value;
    const birthMonth = document.querySelector("#container-input__birth-month").value;
    const birthYear = document.querySelector("#container-input__birth-year").value;

    return {day: parseInt(birthDay), month: parseInt(birthMonth), year: parseInt(birthYear)};
};

const getGivenDate = () => {
    const givenDay = document.querySelector("#container-input__given-date-day").value;
    const givenMonth = document.querySelector("#container-input__given-date-month").value;
    const givenYear = document.querySelector("#container-input__given-date-year").value;

    return {day: parseInt(givenDay), month: parseInt(givenMonth), year: parseInt(givenYear)};
};

const calculateAge = () => {
    const birthDate = getBirthDate();
    const givenDate = getGivenDate();

    if (!isValidDate(birthDate) || !isValidDate(givenDate)) {
        alert("Must be a valid date");
        return
    }

    if (birthDate.year > givenDate.year) {
        alert("Birth year is greater than the given year!");
        return
    }

    let ageDays = givenDate.day - birthDate.day;
    let ageMonths = givenDate.month - birthDate.month;
    let ageYears = givenDate.year - birthDate.year;

    if (ageDays < 0) {
        ageMonths--;
        ageDays += 30;
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    return {years: ageYears, months: ageMonths, days: ageDays};
};

const drawResult = () => {
    const age = calculateAge();
    const calculatorScreen = document.querySelector(".container__screen");
    calculatorScreen.innerHTML = `
        <h1>Years: ${age.years}</h1>
        <h1>Months: ${age.months}</h1>
        <h1>Days: ${age.days}</h1>
    `;
};

const setCurrentDate = () => {
    const today = new Date();
    const currentDay = String(today.getDate()).padStart(2, '0');
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    document.querySelector("#container-input__given-date-day").value = currentDay;
    document.querySelector("#container-input__given-date-month").value = currentMonth;
    document.querySelector("#container-input__given-date-year").value = currentYear;
};

calculatorForm.onsubmit = (event) => {
    event.preventDefault();
    drawResult();
};

setCurrentDate();