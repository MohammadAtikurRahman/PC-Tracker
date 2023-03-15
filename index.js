
ipcRenderer.on("boot-time-data", (event, formattedBootTime, currentTime) => {
    const bootTimeElement = document.getElementById("boot-time");
    const currentTimeElement = document.getElementById("current-time");
  
    bootTimeElement.textContent = formattedBootTime;
    currentTimeElement.textContent = currentTime;
  });
  