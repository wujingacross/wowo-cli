import fs from 'fs';

export const updateJsonFile = (projectName, answer) => {
  const fileName = `${projectName}/package.json`;
  if (fs.existsSync(fileName)) {
    const data = fs.readFileSync(fileName).toString();
    let json = JSON.parse(data);
    json.name = projectName;
    json.author = answer.author;
    json.description = answer.description;
    //修改项目文件夹中 package.json 文件
    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
  }
};
