async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");
  const button = document.querySelector("button");

  button.disabled = true;
  button.innerText = "Checking...";

  message.style.color = "#60a5fa";
  message.innerText = "Please wait...";

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.message === "Login success") {
      message.style.color = "#4ade80";
      message.innerText = "Login successful 🚀";

      // token
      localStorage.setItem("token", data.token);

      // success animation
      button.innerText = "Success ✓";
      button.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);
    } else {
      message.style.color = "#f87171";
      message.innerText = data.message || "Login failed";

      button.disabled = false;
      button.innerText = "Login";
    }
  } catch (err) {
    message.style.color = "#f87171";
    message.innerText = "Server error ⚠";

    button.disabled = false;
    button.innerText = "Login";
  }
}
