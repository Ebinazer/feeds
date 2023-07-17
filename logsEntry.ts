import moment from "moment";

const fs = require('fs');
const path = require('path');

const logsDirectory = path.join(__dirname,  'logs');
let logFilePath 

export const logUserOperation = async (user, operation) => {
  
  const logData = `[${new Date().toISOString()}] User: ${user}, Operation: ${operation}\n\n`;
  
  fs.appendFile(logFilePath, logData, (err) => {
    if (err) {
      console.error('Error logging operation:', err);
    }
  });
}

export const createLogFile = async () => {
  const timestamp = moment().format('HH-mm');
const logFileName = `operations-${timestamp}.log`;

  logFilePath = path.join(logsDirectory, logFileName);

  // Create the new log file
  try {
    fs.writeFileSync(logFilePath, ''); // Create an empty file
    console.log('New log file created:', logFileName);
  } catch (err) {
    console.error('Error creating log file:', err);
  }
}

export const readLogData =async () => {
  const files = fs.readdirSync(logsDirectory); // Read all files in the logs directory

  const logsWithinTimeframe = files.filter((file) => {
    const filePath = path.join(logsDirectory, file);
    const fileStat = fs.statSync(filePath);
    const modifiedTime = moment(fileStat.mtime);

    // Check if the file was modified within the last 5 minutes
    return moment().diff(modifiedTime, 'minutes') <= 5;
  });

  const logContents = [];

  logsWithinTimeframe.forEach((file) => {
    const filePath = path.join(logsDirectory, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    logContents.push({ file, content });
  });

  return logContents
}

export const deleteOldLogs =async () => {
  const files = fs.readdirSync(logsDirectory);

  files.forEach((file) => {
    const filePath = path.join(logsDirectory, file);
    const fileStat = fs.statSync(filePath);
    const modifiedTime = moment(fileStat.mtime);
    console.log('inside', '',moment().diff(modifiedTime, 'minutes') > 30)
    // Check if the file was modified more than 30 minutes ago
    if (moment().diff(modifiedTime, 'minutes') > 30) {
      fs.unlinkSync(filePath); // Delete the file
      console.log('Deleted log file:', file);
    }
  });
}
