import "@/style.css";
import { navigateTo, router } from "@/router/router";

document.addEventListener("DOMContentLoaded", () => {
  router();

  document.body.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-link]");
    if (!link) return;

    event.preventDefault();
    const url = new URL(link.href);
    navigateTo(url.pathname);
  });
});
