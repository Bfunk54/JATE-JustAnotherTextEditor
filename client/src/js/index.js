import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

// select the main element
const main = document.querySelector("#main");
// set the html of it to nothing to clear it
main.innerHTML = "";

// function to create and append the spinner to the document
const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// create a new instance of the editor
const editor = new Editor();

// if the typeof the editor is undefined, load the spinner
if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}
