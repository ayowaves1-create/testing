

// Dummy user credentials (can be replaced with API check)
const storedUser = {
    username: "admin",
    password: "1234"
};

// Save dummy user in localStorage (for offline use)
if (!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify(storedUser));
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (username === savedUser.username && password === savedUser.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html"; // Redirect to main app
    } else {
        errorMsg.textContent = "Invalid username or password.";
    }
});

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

function showRegister() {
            document.getElementById("loginForm").classList.remove("active");
            document.getElementById("registerForm").classList.add("active");
        }

        function showLogin() {
            document.getElementById("registerForm").classList.remove("active");
            document.getElementById("loginForm").classList.add("active");
        }

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

            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration successful! You can now log in.");
            showLogin();
        }

        function loginUser() {
            const username = document.getElementById("loginUsername").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];

            const validUser = users.find(user => user.username === username && user.password === password);

            if (validUser) {
                alert("Login successful! Welcome " + username);
            } else {
                alert("Invalid username or password.");
            }
        }
