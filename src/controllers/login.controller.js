import { saveSession } from "@/utils";
import { navigateTo } from "@/router/router";
import { http } from "@/api/http";

export const loginController = () => {
  const form = document.querySelector("#loginForm");
  const errorContainer = document.querySelector("#loginError");

  const showError = (message) => {
    if (!errorContainer) return;
    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
  };

  const resetError = () => {
    if (!errorContainer) return;
    errorContainer.textContent = "";
    errorContainer.classList.add("hidden");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resetError();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      showError("Completa los campos para continuar.");
      return;
    }

    try {
      const users = await http.get(
        `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      );

      if (!users.length) {
        showError("Credenciales incorrectas.");
        return;
      }

      saveSession({
        id: users[0].id,
        name: users[0].name,
        role: users[0].role,
      });

      navigateTo("/home");
    } catch (error) {
      console.error(error);
      showError("No se pudo conectar con la API.");
    }
  });
};
