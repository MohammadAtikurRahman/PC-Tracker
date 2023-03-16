const { ipcRenderer } = require("electron");

// When the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  // Send a message to the main process to get the current time
  ipcRenderer.send("get-current-time");

  // Listen for the current time from the main process
  ipcRenderer.on("current-time", (event, currentTimeon) => {
    // Set the current time in the HTML element
    const currentTimeElement = document.getElementById("currentTimeon");
    currentTimeElement.textContent = currentTimeon;
  });

  ipcRenderer.send("get-formattedtime");
  ipcRenderer.on("formatted-time", (event, formattedBootTime) => {
    const currentTimeElement1 = document.getElementById("formattedBootTime");
    currentTimeElement1.textContent = formattedBootTime;
  });

  ipcRenderer.send("get-currentDate");
  ipcRenderer.on("currentDate-time", (event, currentDate) => {
    const currentTimeElement2 = document.getElementById("currentDate");
    currentTimeElement2.textContent = currentDate;
  });

  ipcRenderer.send("get-booteddate");
  ipcRenderer.on("booteddate-time", (event, booteddate) => {
    const currentTimeElement3 = document.getElementById("booteddate");
    currentTimeElement3.textContent = booteddate;
  });


  ipcRenderer.send("get-bootedtime");
  ipcRenderer.on("get-bootedtime-time", (event, bootedtime) => {
    const currentTimeElement3 = document.getElementById("bootedtime");
    currentTimeElement3.textContent = bootedtime;
  });




  



  ipcRenderer.send("get-durationString");
  ipcRenderer.on("get-get-durationString-time", (event, durationString) => {
    const currentTimeElement3 = document.getElementById("durationString");
    currentTimeElement3.textContent = durationString;
  });


  ipcRenderer.send("get-user_pc");
  ipcRenderer.on("get-user_pc-time", (event, user_pc) => {
    const currentTimeElement3 = document.getElementById("user_pc");
    currentTimeElement3.textContent = user_pc;
  });


});
