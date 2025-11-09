// ad.js - pure JS, paste ini ke file dan upload ke GitHub
(function(){
  try {
    // masukkan base64 strings di sini (ambil dari file asli kamu)
    var b64s = [
      "PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgoJYXRPcHRpb25zID0gewoJCSdrZXknIDogJ2JlMjkyZjRkNmY4ZTgxMjg5NGJjYzc2ZDg0MTBmOWZiJywKCQknZm9ybWF0JyA6ICdpZnJhbWUnLAoJCSdoZWlnaHQnIDogNTAsCgkJJ3dpZHRoJyA6IDMyMCwKCQkncGFyYW1zJyA6IHt9Cgl9Owo8L3NjcmlwdD4KPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiIHNyYz0iLy9hcHBqYXJnb25iZWFtcy5jb20vYmUyOTJmNGQ2ZjhlODEyODk0YmNjNzZkODQxMGY5ZmIvaW52b2tlLmpzIj48L3NjcmlwdD4=",
      "PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgoJYXRPcHRpb25zID0gewoJCSdrZXknIDogJzFhNDFjYjNlZWI2MzcwOTljODhlODZkMjZlZmIzYTU4JywKCQknZm9ybWF0JyA6ICdpZnJhbWUnLAoJCSdoZWlnaHQnIDogOTAsCgkJJ3dpZHRoJyA6IDcyOCwKCQkncGFyYW1zJyA6IHt9Cgl9Owo8L3NjcmlwdD4KPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiIHNyYz0iLy9hcHBqYXJnb25iZWFtcy5jb20vMWE0MWNiM2VlYjYzNzA5OWM4OGU4NmQyNmVmYjNhNTgvaW52b2tlLmpzIj48L3NjcmlwdD4="
    ];

    // tempatkan container sebelum <script> yang memanggil ad.js, atau append ke body
    var anchor = document.currentScript && document.currentScript.parentNode ? document.currentScript : null;
    var container = document.createElement('div');
    container.className = 'ad-remote-container';
    container.style = 'display:block;'; // default, bisa diatur CSS external

    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(container, anchor);
    } else {
      // fallback append ke body
      document.body.appendChild(container);
    }

    b64s.forEach(function(b64){
      try {
        var html = atob(b64);
        // parse the decoded HTML fragment
        var tmp = document.createElement('div');
        tmp.innerHTML = html;

        // move non-script nodes into container
        Array.prototype.slice.call(tmp.childNodes).forEach(function(node){
          if (node.tagName && node.tagName.toLowerCase() === 'script') {
            // create new script element so it executes
            var newS = document.createElement('script');
            // if script has src attribute
            if (node.src) {
              // handle protocol-relative URLs (//example.com)
              var src = node.getAttribute('src');
              if (src.indexOf('//') === 0) src = window.location.protocol + src;
              newS.src = src;
              // keep synchronous loading order (disable async)
              newS.async = false;
            } else {
              // inline script: copy text
              newS.text = node.textContent || node.innerText || '';
            }
            container.appendChild(newS);
          } else {
            // normal element (div, center, etc.) copy it
            container.appendChild(node.cloneNode(true));
          }
        });
      } catch(eDecode){
        // kalau atob gagal, jangan ganggu halaman
        console.error('ad.js decode error', eDecode);
      }
    });

  } catch(e){
    console.error('ad.js general error', e);
  }
})();
