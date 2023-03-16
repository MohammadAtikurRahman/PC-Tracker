// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");

// const bootTime8 = require('./process') // replace with the name of your file

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

const os = require("os");
const fs = require("fs");

// Get the system uptime in seconds
const uptimeInSeconds = os.uptime();

// Calculate the boot time by subtracting the uptime from the current time
const bootTime = Date.now() - uptimeInSeconds * 1000;

// Convert the boot time to a Date object
const bootTimeDate = new Date(bootTime);

// Format the date with a GMT+6 timezone offset
const options = {
  timeZone: "Asia/Dhaka",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

// Format the boot time date
const formattedBootTime = bootTimeDate
  .toLocaleString("en-GB", options)
  .replace(",", "") // remove the comma
  .replace(" at", ","); // replace "at" with a comma
// Get the current time and format it

const [booteddate, bootedtime] = formattedBootTime.split(", ");

// console.log("boot date",booteddate); // "Thursday 16 March 2023"
// console.log("boot time",bootedtime); // "4:52:49 pm"

const now = new Date();
const currentTime = now
  .toLocaleTimeString("en-GB", options)
  .replace(",", "") // remove the comma
  .replace(" at", ","); // replace "at" with a comma
const [currentDate, currentTimeon] = currentTime.split(", ");

// console.log(currentTimeon); // Output: 5:30:45 PM
// console.log("date ogffffffffffffffffffffffffff",currentDate); // Output: Thursday 16 March 2023

// Calculate the duration since boot time in seconds
const durationInSeconds = Math.floor((now - bootTime) / 1000);

// Convert the duration to hours, minutes, and seconds
const hours = Math.floor(durationInSeconds / 3600);
const minutes = Math.floor((durationInSeconds % 3600) / 60);
const seconds = durationInSeconds % 60;

// Format the duration as a string

const user_pc = os.userInfo().username;

const durationString = `${hours} hours ${minutes} minutes ${seconds} seconds`;

// Create a string with the boot time, current time, and duration in CSV format

// console.log(formattedBootTime);
// console.log(currentTime);

const csvData = `${formattedBootTime},${currentTime},${durationString},${user_pc}\n`;
const csvString = fs.existsSync("boot_time.csv") ? csvData : `Start Date,Start Time,End Date,End Time,Total Hours Used,PC User\n${csvData}`;

fs.appendFile("boot_time.csv", csvString, (err) => {
  if (err) throw err;
  console.log("Boot time, current time, and duration saved to boot_time.csv");
});
// Log the duration to the console

// console.log("Who used this PC", user_pc);
// console.log(`Duration since boot time: ${durationString}`);

ipcMain.on("get-formattedtime", (event) => {
  event.reply("formatted-time", formattedBootTime);
});

ipcMain.on("get-current-time", (event) => {
  event.reply("current-time", currentTimeon);
});

ipcMain.on("get-currentDate", (event) => {
  event.reply("currentDate-time", currentDate);
});

ipcMain.on("get-booteddate", (event) => {
  event.reply("booteddate-time", booteddate);
});

ipcMain.on("get-bootedtime", (event) => {
  event.reply("get-bootedtime-time", bootedtime);
});

ipcMain.on("get-durationString", (event) => {
  event.reply("get-get-durationString-time", durationString);
});

ipcMain.on("get-user_pc", (event) => {
  event.reply("get-user_pc-time", user_pc);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
