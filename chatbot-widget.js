<script>
(function () {
  if (window.marcelChatbotLoaded) return;
  window.marcelChatbotLoaded = true;

  const CHAT_URL = "https://aipoweragency.vercel.app/"; // ← zmeň na svoje URL

  // vložíme štýly (responsive)
  const style = document.createElement("style");
  style.textContent = `
    #marcel-chat-holder {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 99999;
      display: flex;
      align-items: flex-end;
      pointer-events: none;
    }
    #marcel-chat-iframe {
      pointer-events: auto;
      width: 420px;
      height: 640px;
      border: none;
      border-radius: 18px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
      transition: all .18s ease;
      transform-origin: bottom right;
      background: #fff;
      overflow: hidden;
    }

    /* tablet / small desktop */
    @media (max-width: 1100px) {
      #marcel-chat-iframe { width: 360px; height: 600px; border-radius: 16px; }
      #marcel-chat-holder { right: 16px; bottom: 16px; }
    }

    /* small screens (phones) */
    @media (max-width: 600px) {
      #marcel-chat-holder {
        left: 12px;
        right: 12px;
        bottom: 12px;
        justify-content: center;
        padding: env(safe-area-inset-bottom);
      }
      #marcel-chat-iframe {
        width: calc(100% - 24px);
        height: 85vh;
        max-width: 720px;
        border-radius: 12px;
      }
    }

    /* extra small */
    @media (max-width: 360px) {
      #marcel-chat-iframe { height: 78vh; }
    }
  `;
  document.head.appendChild(style);

  // holder + iframe
  const holder = document.createElement("div");
  holder.id = "marcel-chat-holder";

  const iframe = document.createElement("iframe");
  iframe.id = "marcel-chat-iframe";
  iframe.src = CHAT_URL;
  iframe.setAttribute("aria-label", "Chatbot");
  iframe.setAttribute("loading", "lazy");

  // pridať do DOM
  holder.appendChild(iframe);
  document.body.appendChild(holder);

  // drobná JS korekcia pri veľmi úzkych obrazovkách
  function adjustForTiny() {
    if (window.innerWidth < 330) {
      iframe.style.height = "75vh";
    } else {
      // nech CSS rozhodne
      iframe.style.height = "";
    }
  }
  window.addEventListener("resize", adjustForTiny);
  adjustForTiny();

})();
</script>
