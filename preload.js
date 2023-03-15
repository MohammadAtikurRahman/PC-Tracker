const { ipcRenderer } = require("electron");

// When the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  // Send a message to the main process to get the current time
  ipcRenderer.send("get-current-time");

  // Listen for the current time from the main process
  ipcRenderer.on("current-time", (event, currentTime) => {
    // Set the current time in the HTML element
    const currentTimeElement = document.getElementById("currentTime");
    currentTimeElement.textContent = currentTime;
  });




  ipcRenderer.send("get-formattedtime");

  // Listen for the current time from the main process
  ipcRenderer.on("formatted-time", (event, formattedBootTime) => {
    // Set the current time in the HTML element
    const currentTimeElement1 = document.getElementById("formattedBootTime");
    currentTimeElement1.textContent = formattedBootTime;
  });


  



});
