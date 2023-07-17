import { Options, Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config()

console.log(process.env.DB_DATABASE)

// Options for the database connection
const options: Options = {
    database: process.env.DB_DATABASE,
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    logging: console.log
};

/**
 * Add password to the options if it is provided
 * This is to prevent mysql throwing errors "PASSWORD=YES" when
 * running on environments which does not have password like localhost
 */


// Export a singleton connection instance
export const sequelize = new Sequelize(options);
