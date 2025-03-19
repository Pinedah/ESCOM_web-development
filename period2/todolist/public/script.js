document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                document.getElementById("signupError").textContent = "Las contraseñas no coinciden.";
                return;
            }

            try {
                const response = await fetch("/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "/";  // Redirige a la página principal
                } else {
                    document.getElementById("signupError").textContent = data.error;
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
});
