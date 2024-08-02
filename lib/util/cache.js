const fs = require('fs');
const path = require('path');

const lastCommitDescriptionFilePath = path.join(__dirname, 'lastCommitDescription.txt');

// 保存提交描述到临时文件
const saveLastCommitDescription = (state) => {
    const {answers} = state;
    const description = answers.body
    fs.writeFileSync(lastCommitDescriptionFilePath, description);
    console.log('-----储存成功-----');
};
// 读取上次的提交描述
const loadLastCommitDescription = () => {
    try {
        const res =  fs.readFileSync(lastCommitDescriptionFilePath, 'utf8');
        console.log('--------读取成功-------');
        return res;
    } catch (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在，没有找到上次的提交描述
        return '';
      }
      throw error;
    }
  };
module.exports = {saveLastCommitDescription,loadLastCommitDescription};