<script>
(function () {
  if (window.marcelChatbotLoaded) return;
  window.marcelChatbotLoaded = true;

  try {
    const CHAT_URL = "https://aipoweragency.vercel.app/"; // <-- zmeň na svoju URL

    // ak už existuje holder (napr. pri reload-e), nerob nič
    if (document.getElementById("marcel-chat-holder")) return;

    // --- vložíme štýly ---
    const style = document.createElement("style");
    style.id = "marcel-chat-style";
    style.textContent = `
      #marcel-chat-holder {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 999999;
        display: flex;
        align-items: flex-end;
        pointer-events: none;
      }
      #marcel-chat-iframe {
        pointer-events: auto;
        width: 420px;
        height: 640px;
        max-width: calc(100vw - 40px);
        border: none;
        border-radius: 18px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        transition: transform .18s ease, opacity .18s ease;
        transform-origin: bottom right;
        background: white;
        overflow: hidden;
      }
      #marcel-chat-toggle {
        pointer-events: auto;
        margin-left: 12px;
        background: #0b74ff;
        color: #fff;
        border: none;
        border-radius: 999px;
        height: 44px;
        min-width: 56px;
        padding: 0 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(11,116,255,0.14);
      }
      #marcel-chat-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: rgba(0,0,0,0.55);
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000000;
      }

      /* tablet / small laptop */
      @media (max-width: 1100px) {
        #marcel-chat-iframe { width: 360px; height: 600px; border-radius: 16px; }
        #marcel-chat-holder { right: 16px; bottom: 16px; }
      }

      /* phone */
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
        #marcel-chat-toggle { display: none; }
      }

      @media (max-width: 360px) {
        #marcel-chat-iframe { height: 78vh; }
      }

      /* hidden state */
      #marcel-chat-holder.hidden { opacity: 0; transform: translateY(8px); pointer-events: none; }
    `;
    document.head.appendChild(style);

    // --- elementy ---
    const holder = document.createElement("div");
    holder.id = "marcel-chat-holder";

    const iframe = document.createElement("iframe");
    iframe.id = "marcel-chat-iframe";
    iframe.src = CHAT_URL;
    iframe.setAttribute("aria-label", "Chatbot");
    iframe.setAttribute("loading", "lazy");

    // close (x) inside iframe corner
    const closeBtn = document.createElement("button");
    closeBtn.id = "marcel-chat-close";
    closeBtn.title = "Zatvoriť chat";
    closeBtn.innerHTML = "✕";
    closeBtn.addEventListener("click", () => {
      holder.classList.add("hidden");
      openBtn.style.display = "inline-flex";
    });

    // toggle (plávajúce) - zobrazí iframe keď je skrytý
    const openBtn = document.createElement("button");
    openBtn.id = "marcel-chat-toggle";
    openBtn.innerText = "Chat";
    openBtn.title = "Otvoriť chat";
    openBtn.style.display = "none"; // štandardne skryté (iframe otvorené)
    openBtn.addEventListener("click", () => {
      holder.classList.remove("hidden");
      openBtn.style.display = "none";
      // daj focus do iframe (nie všetky prehliadače to umožnia)
      try { iframe.contentWindow && iframe.contentWindow.focus && iframe.contentWindow.focus(); } catch (e) {}
    });

    // --- zostavenie DOM ---
    holder.appendChild(iframe);
    holder.appendChild(closeBtn);
    document.body.appendChild(holder);
    document.body.appendChild(openBtn);

    // pri zavretí iframe zobrazíme toggle tlačidlo
    // (ak chceš iné správanie, uprav tu)
    // initial check pre ultra-small screens
    function adjustForTiny() {
      if (window.innerWidth < 330) {
        iframe.style.height = "75vh";
      } else {
        iframe.style.height = ""; // nech CSS rozhodne
      }
    }
    window.addEventListener("resize", adjustForTiny);
    adjustForTiny();

    // bezpečný fallback: ak iframe ne-nahrá do 8s, zobraz tlačidlo na otvorenie
    let loaded = false;
    iframe.addEventListener("load", () => { loaded = true; openBtn.style.display = "none"; });
    setTimeout(() => {
      if (!loaded) {
        // môže byť CSP alebo pomalé pripojenie; povolíme otváracie tlačidlo
        holder.classList.add("hidden");
        openBtn.style.display = "inline-flex";
        console.warn("Marcel chatbot: iframe load timeout — zobrazujem tlačidlo pre otvorenie. Skontroluj CHAT_URL / CSP.");
      }
    }, 8000);

  } catch (err) {
    console.error("Marcel chatbot failed to initialize:", err);
  }

})();
</script>
