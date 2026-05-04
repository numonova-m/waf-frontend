async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  message.innerText = "Loading...";

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    message.innerText = data.message;

    if (data.message === "Login success") {
      message.style.color = "#4ade80";

      // 🔥 token saqlash
      localStorage.setItem("token", data.token);

      // redirect
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      message.style.color = "#f87171";
    }
  } catch (err) {
    message.innerText = "Server error";
  }
}
