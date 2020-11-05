if (window.UsingBetterGuilded) { 
  
} 

window.UsingBetterGuilded = true;

window.BG = { 
  API: {}, 
  Memory: { 
    Internal: {} 
  }
};

BG.API.FetchURL = (url) => {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status != 200) rej(xhr.status);
        else res(xhr.responseText);
      }
    };

    xhr.open("GET", url, true);
    xhr.send();
  });
}

BG.API.LoadCSS = (raw) => {
  var style = document.createElement("style");
  style.textContent = raw;
  document.head.appendChild(style);
}

BG.API.LoadStyle = (url) => {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

BG.API.LoadScript = (url) => {
  var script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);
  return script;
}

let vexDialogOpen = false;
BG.API.LoadStyle("https://cdn.jsdelivr.net/npm/vex-js@4.1.0/dist/css/vex.min.css");
BG.API.LoadStyle("https://cdn.jsdelivr.net/npm/vex-js@4.1.0/dist/css/vex-theme-wireframe.min.css");
BG.API.LoadScript("https://cdn.jsdelivr.net/npm/vex-js@4.1.0/dist/js/vex.combined.min.js").addEventListener("load", _ => {
  vex.defaultOptions.className = "vex-theme-wireframe";
});

document.addEventListener("keydown", (e) => {
  if (!vexDialogOpen) {
    if (e.key == "Insert") {
      vexDialogOpen = true;
      vex.dialog.prompt({
        message: 'Enter a command',
        placeholder: 'help',
        callback: function (value) {
          if (value)
            CommandHelper(value);
          else
            vexDialogOpen = false;
        }
      });
    }
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
