// todo: add more after basic POC
window.BetterGuildedBootstrapped = true;

let textboxCheckInterval = setInterval(() => {
  let _res = document.getElementsByClassName("Editor-container Editor-container-type-simple ChatChannelInput-editor");
  if (_res.length == 0) return;
 
  let ta = document.evaluate("div/div[2]/div/span/span/span", _res[0], null, 9, null).singleNodeValue;
  if (!ta) return;
  
  clearInterval(textboxCheckInterval);
 
  _res[0].addEventListener("keydown", (e) => {
    if (e.key == "Enter" && !e.shiftKey) {
      if (ta.textContent.length >= 1 && ta.textContent[0] == ".") {
        e.stopPropagation();
        e.preventDefault();
        
        let value = ta.textContent;
        
        CommandHelper(value, ta);
      }
    }
  });
}, 100);

function CommandHelper(command, elem) {
  let args = command.substr(1).split(" ");

  switch (args[0]) {
    case "help":
      elem.textContent = "BetterGuilded @ github.com/xKiraiChan/BetterGuilded";
      break;
    case "load":
    case "unload":
      elem.textContent = "Not Implemented";
      break;
    default:
      elem.textContent = "Unknown command"
  }
}
