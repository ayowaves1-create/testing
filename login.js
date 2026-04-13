
// Save dummy user in localStorage (with hashed password)
if (!localStorage.getItem("users")) {
    const defaultUser = [{
        username: "admin",
        password: CryptoJS.SHA256("1234").toString()
    }];
    localStorage.setItem("users", JSON.stringify(defaultUser));
}

// LOGIN FORM HANDLER
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Hash the entered password
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Validate credentials
    const validUser = users.find(user => 
        user.username.toLowerCase() === username.toLowerCase() && user.password === hashedPassword
    );

    if (validUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);
        window.location.href = "dashboard.html"; // Redirect to main app
    } else {
        errorMsg.textContent = "Invalid username or password.";
    }
});

// LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// SHOW REGISTER FORM
function showRegister() {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.add("active");
}

// SHOW LOGIN FORM
function showLogin() {
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
}

// REGISTER USER
function registerUser() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        alert("Username already taken. Please choose another.");
        return;
    }

    // Hash password before saving
    const hashedPassword = CryptoJS.SHA256(password).toString();

    users.push({ username, password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    showLogin();
}

// LOGIN USER (alternative button-based login)
function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const validUser = users.find(user => 
        user.username.toLowerCase() === username.toLowerCase() && user.password === hashedPassword
    );

    if (validUser) {
        alert("Login successful! Welcome " + username);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password.");
    }
}

// FORM VALIDATION FUNCTION
function validateForm(username, password, isRegister = false) {
    // Check empty fields
    if (!username || !password) {
        return "Please fill in all fields.";
    }

    // Username rules (example: at least 3 characters, only letters/numbers)
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!usernameRegex.test(username)) {
        return "Username must be at least 3 characters and contain only letters or numbers.";
    }

    // Password rules (example: at least 6 characters, must contain a number)
    if (isRegister) {
        const passwordRegex = /^(?=.*[0-9]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return "Password must be at least 6 characters and include at least one number.";
        }
    }

    return null; // No errors
}

// REGISTER USER
function registerUser() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    const error = validateForm(username, password, true);
    if (error) {
        alert(error);
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        alert("Username already taken. Please choose another.");
        return;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    users.push({ username, password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    showLogin();
}

// LOGIN USER
function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const error = validateForm(username, password);
    if (error) {
        alert(error);
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const validUser = users.find(user => 
        user.username.toLowerCase() === username.toLowerCase() && user.password === hashedPassword
    );

    if (validUser) {
        alert("Login successful! Welcome " + username);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password.");
    }
}

// --- REGISTER USER ---
function registerUser() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    // Basic validation
    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        alert("Username already taken. Please choose another.");
        return;
    }

    // Hash password before saving
    const hashedPassword = CryptoJS.SHA256(password).toString();

    users.push({ username, password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    showLogin();
}

// --- LOGIN USER ---
function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const validUser = users.find(user => 
        user.username.toLowerCase() === username.toLowerCase() && user.password === hashedPassword
    );

    if (validUser) {
        alert("Login successful! Welcome " + username);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);

        // Save login time + session duration (30 minutes)
        localStorage.setItem("loginTime", Date.now());
        localStorage.setItem("sessionDuration", 90 * 60 * 1000);

        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password.");
    }
}

// --- SESSION CHECK (run on dashboard.html) ---
function checkSession() {
    const loggedIn = localStorage.getItem("loggedIn");
    const loginTime = localStorage.getItem("loginTime");
    const sessionDuration = localStorage.getItem("sessionDuration");

    if (!loggedIn || !loginTime || !sessionDuration) {
        logout();
        return;
    }

    const currentTime = Date.now();
    if (currentTime - loginTime > sessionDuration) {
        alert("Session expired. Please log in again.");
        logout();
    }
}

// --- LOGOUT ---
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("sessionDuration");
    window.location.href = "index.html";
}

// Run session check automatically when dashboard loads
window.onload = checkSession;
