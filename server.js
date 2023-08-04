const menu = require('./menu');
const connection = require('./db');

const PORT = 3001;

connection.connect((err) => {
  if (err) throw err;
  console.log('Welcome to the BIG BROTHER tracker');
  menu.startMenu();
});
