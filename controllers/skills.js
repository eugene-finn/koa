const fs = require('fs');
const path = require('path');
const dbSkills = path.join(__dirname, '../db/skills.json');

exports.get = () => new Promise(async (resolve, reject) => {
  try {
    let skills = [];
    if (fs.existsSync(dbSkills)) {
      skills = JSON.parse(fs.readFileSync(dbSkills, 'utf-8'));
    }
    resolve(skills);
  } catch (error) {
    reject(error);
  }
});

exports.set = ({
  age,
  concerts,
  cities,
  years
}) => new Promise(async (resolve, reject) => {
  const skills = [{
      "number": age,
      "text": "Возраст начала занятий на скрипке"
    },
    {
      "number": concerts,
      "text": "Концертов отыграл"
    },
    {
      "number": cities,
      "text": "Максимальное число городов в туре"
    },
    {
      "number": years,
      "text": "Лет на сцене в качестве скрипача"
    }
  ]

  console.log('skills', skills);
  try {

    fs.writeFileSync(path.join(process.cwd(), '/db/skills.json'), JSON.stringify(skills));
    resolve(true);

  } catch (error) {

  }
})