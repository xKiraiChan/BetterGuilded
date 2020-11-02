  // todo: add more after basic POC
  window.UsingBetterGuilded = true;

  const Module = GuildedNative.require("module");

  window.BG = {};
  BG.API = {};
  BG.Memory = {};
  BG.Memory.Internal = {};

  BG.API.FetchURL = (url) => {
    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status != 200) rej(xhr.status);
          else res(xhr.responseText);
        }
      };

      xhr.open("GET", url, true);
      xhr.send();
    });
  }

  BG.API.LoadCSS = (css) => {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  BG.API.LoadScript = (src) => {
    var script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
  }

  BG.API.LoadScript("https://cdn.jsdelivr.net/npm/vex-js@4.1.0/dist/js/vex.combined.min.js");
  (async () => {
    BG.API.LoadCSS(await BG.API.FetchURL("https://cdn.jsdelivr.net/npm/vex-js@4.1.0/dist/css/vex.min.css"));
    BG.API.LoadCSS(await BG.API.FetchURL("https://cdn.jsdelivr.net/npm/vex-js@4.1.0/dist/css/vex-theme-wireframe.min.css"));
  })();

  let vexAwaiter = setInterval(() => {
    if (!window.vex) return;

    clearInterval(vexAwaiter);

    vex.defaultOptions.className = "vex-theme-wireframe";
  }, 250)

  document.addEventListener("keydown", (e) => {
    if (e.key == "Insert") {
      vex.dialog.prompt({
        message: 'Enter a command',
        placeholder: 'help',
        callback: function (value) {
          if (value) 
            CommandHelper(value);
        }
      });
    }
  });

  function CommandHelper(raw) {    
    let args = raw.trim().split(" ").filter(token => token.length > 0);
    if (args.length == 0) {
      vex.dialog.alert("Empty command");
      return; 
    }

    let command = args.splice(0, 1)[0];

    switch (command) {
      case "help":
        vex.dialog.alert("BetterGuilded @ github.com/xKiraiChan/BetterGuilded");
        break;
      case "load":
      case "unload":
        vex.dialog.alert("Not Implemented");
        break;
      default:
        vex.dialog.alert("Unknown command");
    }
  }
