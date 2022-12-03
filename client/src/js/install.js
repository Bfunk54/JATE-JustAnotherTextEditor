// grab the install button element
const butInstall = document.getElementById("buttonInstall");

// add an event listener to the install button
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  // set the install prompt to the event
  window.deferredPrompt = event;

  // make sure the install button isn't hidden
  butInstall.removeAttribute("hidden");
});

// add a event listener to the click install button
butInstall.addEventListener("click", async () => {
  // set a variable to the deferred prompt
  const promptEvent = window.deferredPrompt;
  // if the prompt event null exit the function
  if (!promptEvent) {
    return;
  }
  // show the prompt
  promptEvent.prompt();

  // wait for the user to respond to the prompt
  window.deferredPrompt = null;

  // hide the install button
  butInstall.setAttribute("hidden", true);
});

// see if the app is already installed
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
