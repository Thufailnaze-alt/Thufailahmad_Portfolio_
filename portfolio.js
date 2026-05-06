const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 0.05, 0.35)}s`;
  observer.observe(item);
});

const downloadButton = document.querySelector(".btn-download");

if (downloadButton) {
  downloadButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const resumePath = downloadButton.getAttribute("href") || "./resume.html";
    const fileName =
      downloadButton.getAttribute("download") || "Thufailahmad_M_Resume.html";

    try {
      const response = await fetch(resumePath);
      if (!response.ok) {
        throw new Error("Resume download failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.download = fileName;
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback for restrictive browser/file environments.
      const fallbackLink = document.createElement("a");
      fallbackLink.href = resumePath;
      fallbackLink.download = fileName;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      fallbackLink.remove();
    }
  });
}
