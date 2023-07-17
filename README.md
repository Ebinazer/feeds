# World

The Application is created with nodejs and express server. and FS for the logs and mysql data base. 

# Dependencies
Nodejs,
Visual studio (IDE),
Mysql workbench ,


Initial setup

# Install the Node.js version required for the app to run
nvm install

# Use the installed Node.js version as the default for the project
nvm use ( i have used v14.20.1)

# Clone the repository: `git clone <repository-url>`
Clone it to the local machine

# Database connection
Create schema take the detaills like Host, db username ,password and database and replace in the env file. so the database conection would happen.

# libraries
Npm i ( would install all the libraries required)

# Good to go for the server
Once the libraries are installed  
Npm start would run the server and it would automatically create the tables which are missing, in our case user, feed and feed access.
the Super admin crendetials are 
email: ebi@example.com
pwd : Qwertyui123

# User interface
Once the backend is up and running and the table are syncronized. the api is ready to be triggered.,
Every 5 minutes a new file is created and 30 mins the old files are deleted
