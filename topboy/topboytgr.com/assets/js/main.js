/* Google Analytics - platform clicks */

document.querySelectorAll("[data-platform]").forEach((item) => {
  item.addEventListener("click", () => {
    const platformName = item.dataset.platform;

    if (typeof gtag === "function") {
      gtag("event", "platform_click", {
        platform_name: platformName,
        page_section: "release_platforms"
      });
    }
  });
});