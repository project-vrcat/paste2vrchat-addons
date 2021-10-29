let vimeoButton = document.createElement("li");
vimeoButton.id = "paste2vrchat";
vimeoButton.innerText = "Paste to VRChat";
vimeoButton.addEventListener("click", () => {
  chrome.runtime.sendMessage("pasteText");
});
vimeoButton.classList.add(
  "paste2vrchat",
  "topnav_desktop_menu_items",
  "topnav_desktop_menu_items_left"
);
const elements = document.getElementsByClassName("topnav_menu_desktop_main");
if (elements.length > 0) {
  elements[0].append(vimeoButton);
}
