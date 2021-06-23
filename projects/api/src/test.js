const bcrypt = require('bcrypt');

const saltRounds = 10;

const passwordEncrypt = async password => {
  return await bcrypt.hash(password, saltRounds);
};

const checkPassword = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};


// const plainTextPassword = '123456';
// const hashedPassword = '$2b$10$RRx05Yp8a/dMmA4ZSPaSZOyxkccrA.m.SPnMnMCiMXhthw48HdIzW';

const plainTextPassword = 'PizzaP@rty99';
const hashedPassword = '$2b$10$7RkKasqsvVICJ44lx9cKOeacqInwcUkdU.3mj6Wr68bpdmFCFjV0y';

// passwordEncrypt(plainTextPassword).then(
//   hashedPassword => console.log(hashedPassword),
//   err => console.error(err),
// );

checkPassword(plainTextPassword, hashedPassword).then(
  result => console.log(result),
  err => console.error(err),
);
