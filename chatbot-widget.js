(function () {
  if (window.__marcelChatbotLoaded) return;
  window.__marcelChatbotLoaded = true;

  const iframe = document.createElement("iframe");
  iframe.src = "https://aipoweragency.vercel.app/"; // ⬅️ tvoje URL
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "400px";
  iframe.style.height = "550px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "18px";
  iframe.style.zIndex = "99999";
  iframe.style.transition = "all 0.3s ease-in-out";

  // Responzívne prispôsobenie podľa veľkosti okna
  function resizeIframe() {
    if (window.innerWidth <= 600) {
      iframe.style.width = "90%";
      iframe.style.height = "70%";
      iframe.style.right = "5%";
      iframe.style.bottom = "10px";
    } else {
      iframe.style.width = "400px";
      iframe.style.height = "550px";
      iframe.style.right = "20px";
      iframe.style.bottom = "20px";
    }
  }

  window.addEventListener("resize", resizeIframe);
  resizeIframe(); // spusti hneď pri načítaní

  document.body.appendChild(iframe);
})();

