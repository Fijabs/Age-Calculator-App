document.getElementById('calculate').addEventListener('click', calculateAge);

function calculateAge() {
    // Get input values
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    // Reset errors
    clearErrors();

    // Validate inputs
    if (!validateInputs(day, month, year)) {
        return;
    }

    // Create date objects
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    // Calculate difference
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, birthDate.getDate());
        days = Math.floor((currentDate - lastMonth) / (1000 * 60 * 60 * 24));
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Display results
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
}

function validateInputs(day, month, year) {
    let isValid = true;
    const currentYear = new Date().getFullYear();

    if (!day || day < 1 || day > 31) {
        showError('day', 'Must be a valid day');
        isValid = false;
    }

    if (!month || month < 1 || month > 12) {
        showError('month', 'Must be a valid month');
        isValid = false;
    }

    if (!year || year > currentYear) {
        showError('year', 'Must be in the past');
        isValid = false;
    }

    // Check valid date (e.g., February 31st)
    if (isValid) {
        const date = new Date(year, month - 1, day);
        if (date.getDate() !== day) {
            showError('day', 'Invalid date');
            isValid = false;
        }
    }

    return isValid;
}

function showError(field, message) {
    document.getElementById(`${field}-error`).textContent = message;
    document.getElementById(field).style.borderColor = '#ff5757';
}

function clearErrors() {
    ['day', 'month', 'year'].forEach(field => {
        document.getElementById(`${field}-error`).textContent = '';
        document.getElementById(field).style.borderColor = '#dcdcdc';
    });
}