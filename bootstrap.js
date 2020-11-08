if (window.UsingBetterGuilded) { 
  let root = document.getElementById("BetterGuildedRoot");
  if (root) root.parentElement.removeChild(root);
}

window.UsingBetterGuilded = true;

window.BG = { 
  API: {}, 
  Memory: { 
    Internal: {} 
  },
  Elements: {
    Scripts: undefined,
    Styles: undefined,
    React: undefined,
    Root: undefined,
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
  BG.Styles.Root.appendChild(style);
}

BG.API.LoadStyle = (url) => {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  BG.Styles.Root.appendChild(link);
}

BG.API.LoadScript = (url) => {
  var script = document.createElement("script");
  script.src = url;
  BG.Elements.Root.appendChild(script);
  return script;
}

new Promise((res) => {
  (document.onreadystatechange = () => {
      if (document.readyState == "complete") res();
  })();
}).then(async () => {
  (BG.Elements.Root = document.createElement("div")).id = "BetterGuildedRoot";
  (BG.Elements.React = document.createElement("div")).id = "BetterGuildedReact";
  (BG.Elements.Scripts = document.createElement("div")).id = "BetterGuildedScripts";

  BG.Elements.Root.appendChild(BG.Elements.React);
  BG.Elements.Root.appendChild(BG.Elements.Scripts);
  document.body.appendChild(BG.Elements.Root);

  BG.API.LoadScript("https://unpkg.com/react@17/umd/react.production.min.js");
  BG.API.LoadScript("https://unpkg.com/react-dom@17/umd/react-dom.production.min.js");
  BG.API.LoadStyle("https://raw.githubusercontent.com/xKiraiChan/BetterGuilded/main/BGDefaultStyle.css");

  ReactDOM.render(eval(await BG.API.FetchURL("https://raw.githubusercontent.com/xKiraiChan/BetterGuilded/main/cli.js")), BG.Elements.React);
});

// document.addEventListener("keydown", (e) => {
//   if (!vexDialogOpen) {
//     if (e.key == "Insert") {
//       vexDialogOpen = true;
//       vex.dialog.prompt({
//         message: 'Enter a command',
//         placeholder: 'help',
//         callback: function (value) {
//           if (value)
//             CommandHelper(value);
//           else
//             vexDialogOpen = false;
//         }
//       });
//     }
//   }
// });

// function CommandHelper(raw) {
//   let args = raw.trim().split(" ").filter(token => token.length > 0);
//   if (args.length == 0) {
//     vex.dialog.alert("Empty command");
//     return;
//   }

//   let command = args.splice(0, 1)[0];

//   switch (command) {
//     case "help":
//       vex.dialog.alert("BetterGuilded @ github.com/xKiraiChan/BetterGuilded");
//       break;
//     case "load":
//     case "unload":
//       vex.dialog.alert("Not Implemented");
//       break;
//     default:
//       vex.dialog.alert("Unknown command");
//   }
// }
