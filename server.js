const inquirer = require('inquirer');
const db = require('./db/connection');
const consoleTable = require('console.table');
const inquirerConfirm = require('inquirer-confirm');

const PORT = process.env.PORT || 3001;

