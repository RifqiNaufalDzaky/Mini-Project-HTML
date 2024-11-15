const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

function saveAccountToLocalStorage(firstname, email, password) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.push({ firstname, email, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function validateLoginCredentials(email, password) {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    return accounts.some(account => account.email === email && account.password === password);
}

form.addEventListener('submit', (e) => {
    let errors = []

    if (firstname_input) {

        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);

        if (errors.length === 0) {
            saveAccountToLocalStorage(firstname_input.value, email_input.value, password_input.value);
            alert("Akun Berhasil Dibuat!");
            e.preventDefault.href = 'login.html';
            return;
        }
    }
    else {

        errors = getLoginFormErrors(email_input.value, password_input.value);

        if (errors.length === 0) {
            // Periksa akun di Local Storage saat login
            if (validateLoginCredentials(email_input.value, password_input.value)) {
                alert("Login berhasil!");
                e.preventDefault();
                window.location.href = 'dashboard.html'; // Arahkan ke halaman dashboard setelah login berhasil
                return;
            } else {
                errors.push("Email atau password salah.");
            }
        }
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(', ');
    }
});


function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = []

    if (firstname === '' || firstname == null) {
        errors.push('Firstname is required')
        firstname_input.parentElement.classList.add('incorrect')
    }
    if (email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    if (password.length < 8) {
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }
    if (password !== repeatPassword) {
        errors.push('Password does not match repeated password')
        password_input.parentElement.classList.add('incorrect')
        repeat_password_input.parentElement.classList.add('incorrect')
    }


    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = []

    if (email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = '';
        }
    })
})

function filterDoctors() {
    const filter = document.getElementById('filter').value;
    const doctors = document.querySelectorAll('.doctor');

    doctors.forEach(doctor => {
        if (filter === 'all') {
            doctor.style.display = '';
        } else if (doctor.classList.contains(filter)) {
            doctor.style.display = '';
        } else {
            doctor.style.display = 'none';
        }
    });
}
