(()=>{"use strict";"docs.google.com"===window.location.hostname&&window.location.pathname.startsWith("/document")?chrome.runtime.onMessage.addListener((e=>{if(e.selection){const e="react-popup-container",o=document.getElementById(e);o&&o.remove();const t=document.createElement("div");t.id=e,t.style.position="fixed",t.style.top="20px",t.style.right="20px",t.style.zIndex="10000",t.style.background="white",t.style.border="1px solid black",t.style.padding="10px",t.style.boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)",document.body.appendChild(t);const n=document.createElement("div");n.id="react-root",t.appendChild(n);const d=document.createElement("script");d.src=chrome.runtime.getURL("popup/index.js"),d.onload=()=>{d.remove()},d.onerror=()=>{console.error("Failed to load the React app script.")},document.body.appendChild(d)}})):console.log("This application only runs on Google Docs.")})();