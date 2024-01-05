
# MySQL DB Employee Tracker

___

## Table of Contents

* [Project Description](#project-description)
* [How to run this project](#how-to-run-this-project)
* [How to use this project](#how-to-use-this-project)
* [Credits](#credits)
* [License](#license)

## Project Description

This project is a command line application that allows the user to view, add, and update tables in a MySQL database. 

## How to run this project

Click on the following image to view the demo video:
[![MySQL DB Employee Tracker - demo](<assets/images/MySQL DB Employee Tracker - demo.png>)](https://drive.google.com/file/d/1_KThXrsfNdhVv8Z1D5NXUuXRIdfuJCvh/view)

Make sure Node.js is installed on your device. You can open the command terminal and enter "node -v" to check if node is installed. If the command terminal responds back with a version of Node, then it is installed. Otherwise, go to https://nodejs.org/en/download/ and download the LTS version of Node for the appropriate OS that you are using (Windows, Mac, Linux, etc.).

Open the command terminal (if you haven't already done so). Enter "node app.js" to initiate the program.

## How to use this project

After initiating the program, you will be given a list of options to choose from:

### View ...

Selects a table of your choice to display in the console log.

### Add ...

Additional questions are asked to provide necessary information about the user-specified table row to be added.

Questions include:

* Department name

* Role title
* Role salary
* Department ID for role

* Employee first name
* Employee last name
* Employee role ID
* Manager status
* Manager ID (if employee is not a manager)

### Update ...

Additional questions are asked to provide necessary information about the user-specified employee data to be updated.

Questions include:

* Employee ID
* New role ID
* Manager ID (if employee is not a manager)

### Close program

Exits out of the program without interacting with the database.

## Credits

Tyler Odo

## License

Default
