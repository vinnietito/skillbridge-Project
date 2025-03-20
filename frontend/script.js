const API_URL = "http://localhost:5000";

// Register User
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.href = "login.html";
});

// Login User
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        alert("Login failed!");
    }
});

// Fetch Courses
async function fetchCourses() {
    const response = await fetch(`${API_URL}/courses`);
    const data = await response.json();
    document.getElementById("courses").innerHTML = data.map(course => `<h3>${course.title}</h3><p>${course.description}</p>`).join("");
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
