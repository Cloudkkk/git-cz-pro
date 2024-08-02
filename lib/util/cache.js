const fs = require('fs');
const path = require('path');

const lastCommitDescriptionFilePath = path.join(__dirname, 'lastCommitDescription.txt');

// 保存提交描述到临时文件
const saveLastCommitDescription = (state) => {
    const {answers} = state;
    const description = answers.subject.trim();
    // 确保文件所在目录存在
    const directory = path.dirname(lastCommitDescriptionFilePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(lastCommitDescriptionFilePath, description);
};
// 读取上次的提交描述
const loadLastCommitDescription = () => {
    try {
        const res =  fs.readFileSync(lastCommitDescriptionFilePath, 'utf8');
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