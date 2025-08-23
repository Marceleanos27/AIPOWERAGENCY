<script>
(function () {
  if (window.marcelChatbotLoaded) return;
  window.marcelChatbotLoaded = true;

  const CHAT_URL = "https://aipoweragency.vercel.app/"; // ← zmeň sem svoju URL (s https)

  // ak už existuje, prerušíme
  if (document.getElementById("marcel-chat-holder")) return;

  // --- štýly ---
  const style = document.createElement("style");
  style.textContent = `
    :root{
      --chat-max-w: 420px;
      --chat-min-w: 300px;
      --chat-max-h: 640px;
      --chat-min-h: 360px;
    }

    /* wrapper */
    #marcel-chat-holder{
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      pointer-events: none; /* klikne len na tlačidlá a iframe */
    }

    /* samotný iframe: plynulé zmeny pomocou clamp */
    #marcel-chat-iframe{
      pointer-events: auto;
      width: clamp(var(--chat-min-w), 38vw, var(--chat-max-w));
      height: clamp(var(--chat-min-h), 60vh, var(--chat-max-h));
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 40px);
      border: none;
      border-radius: 18px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.16);
      transition: width .18s ease, height .18s ease, transform .18s ease, opacity .18s ease;
      transform-origin: bottom right;
      background: #fff;
      overflow: hidden;
      display: block;
    }

    /* close button inside corner */
    #marcel-chat-close{
      position: absolute;
      top: 12px;
      right: 12px;
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
      pointer-events: auto;
      font-size: 16px;
    }

    /* open toggle button (malé) */
    #marcel-chat-toggle {
      pointer-events: auto;
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

    /* skryté state */
    #marcel-chat-holder.hidden { opacity: 0; transform: translateY(8px); pointer-events: none; }

    /* telefón: center + väčšia plochosť */
    @media (max-width: 600px){
      #marcel-chat-holder {
        left: 12px;
        right: 12px;
        bottom: 12px;
        justify-content: center;
        padding: env(safe-area-inset-bottom);
      }
      #marcel-chat-iframe {
        width: calc(100% - 24px);
        height: 88vh;
        border-radius: 12px;
      }
      #marcel-chat-toggle { display: none; } /* necháme len iframe a close */
    }

    /* veľmi úzke obrazovky */
    @media (max-width: 360px) {
      #marcel-chat-iframe { height: 80vh; }
    }
  `;
  document.head.appendChild(style);

  // --- DOM ---
  const holder = document.createElement("div");
  holder.id = "marcel-chat-holder";

  // kontajner pre iframe aby sme mohli dať close button absolútne vnútri
  const frameBox = document.createElement("div");
  frameBox.style.position = "relative";
  frameBox.style.display = "inline-block";
  frameBox.style.pointerEvents = "auto";

  const iframe = document.createElement("iframe");
  iframe.id = "marcel-chat-iframe";
  iframe.src = CHAT_URL;
  iframe.setAttribute("aria-label", "Chatbot");
  iframe.setAttribute("loading", "lazy");

  // close button (vpravo hore nad iframe)
  const closeBtn = document.createElement("button");
  closeBtn.id = "marcel-chat-close";
  closeBtn.innerHTML = "✕";
  closeBtn.title = "Zatvoriť chat";
  closeBtn.addEventListener("click", () => {
    holder.classList.add("hidden");
    openBtn.style.display = "inline-flex";
    // optional: blur iframe to stop autoplay audio etc.
    try { iframe.contentWindow && iframe.contentWindow.postMessage && iframe.contentWindow.postMessage({ type: 'pause' }, '*'); } catch(e){}
  });

  // open toggle - zobrazené len keď je skryté
  const openBtn = document.createElement("button");
  openBtn.id = "marcel-chat-toggle";
  openBtn.innerText = "Chat";
  openBtn.title = "Otvoriť chat";
  openBtn.style.display = "none";
  openBtn.addEventListener("click", () => {
    holder.classList.remove("hidden");
    openBtn.style.display = "none";
    // pokus o focus do iframe (nie vždy povolené)
    try { iframe.contentWindow && iframe.contentWindow.focus && iframe.contentWindow.focus(); } catch(e){}
  });

  // zostavenie
  frameBox.appendChild(iframe);
  frameBox.appendChild(closeBtn);
  holder.appendChild(frameBox);
  document.body.appendChild(holder);
  document.body.appendChild(openBtn);

  // fallback: ak sa iframe nenačítal (CSP / X-Frame-Options), zobrazíme tlačidlo open
  let loaded = false;
  iframe.addEventListener('load', () => {
    loaded = true;
    openBtn.style.display = 'none';
    holder.classList.remove('hidden');
  });
  setTimeout(() => {
    if (!loaded) {
      holder.classList.add('hidden');
      openBtn.style.display = 'inline-flex';
      console.warn('Marcel chatbot: iframe load timeout — pravdepodobne CSP alebo X-Frame-Options na strane CHAT_URL.');
    }
  }, 6000);

  // jemné dodatočné štatistiky pri resize - len pre korekciu veľmi malých šírok
  function tinyAdjust() {
    if (window.innerWidth < 320) {
      iframe.style.height = '78vh';
    } else {
      iframe.style.height = ''; // použije CSS
    }
  }
  window.addEventListener('resize', tinyAdjust);
  tinyAdjust();

})();
</script>
