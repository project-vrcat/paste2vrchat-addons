let youtubeButton = document.createElement("div");
youtubeButton.id = "paste2vrchat";
youtubeButton.innerText = "Paste to VRChat";
youtubeButton.addEventListener("click", () => {
  chrome.runtime.sendMessage("pasteText");
});
youtubeButton.classList.add("paste2vrchat");
document.getElementById("start")?.append(youtubeButton);
