const fs = require('fs');
const path = require('path');
const dbMessages = path.join(__dirname, '../db/messages.json');

exports.set = ({
  name,
  email,
  message
}) => new Promise(async (resolve, reject) => {

  let messages = [];

  messages.push({
    "name": name,
    "email": email,
    "message": message
  });

  console.log('newMessage', messages);
  try {

    fs.writeFileSync(dbMessages, JSON.stringify(messages));
    resolve(true);

  } catch (error) {

  }
})