import express from 'express';
import { router } from './api';
import cors from "cors";
import * as dotenv from 'dotenv';
import { sequelize } from './system/db/sequelize';
import { createLogFile, deleteOldLogs } from './logsEntry';
const cron = require('node-cron')

const app = express();
const port = 3000; // Set the desired port number

// Add extra middleware to the app
dotenv.config();

if (process.env.SYNC === "true") {

    sequelize.sync({ force: false })
        .then(() => {
            console.log('Tables synchronized successfully.');
        })
        .catch((error) => {
            console.error('Error synchronizing tables:', error);
        });

}

app.use(express.json());

// Add cors related headers
app.use(cors());

// Initializing the Application Routes
app.use("/", router);

cron.schedule('*/5 * * * *', async () => {
    await createLogFile()
});

cron.schedule('*/30 * * * *', async () => {
    await deleteOldLogs()
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



