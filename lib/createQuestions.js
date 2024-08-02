/* eslint-disable import/no-dynamic-require, global-require */
const qBody = require('./questions/body');
const qBreaking = require('./questions/breaking');
const qIssues = require('./questions/issues');
const qLerna = require('./questions/lerna');
const qScope = require('./questions/scope');
const qSubject = require('./questions/subject');
const qType = require('./questions/type');

const creators = {
  body: qBody,
  breaking: qBreaking,
  issues: qIssues,
  lerna: qLerna,
  scope: qScope,
  subject: qSubject,
  type: qType
};

const createQuestions = (state, cliAnswers) => {
  // 假设state.lastCommitDescription保存了上次提交的描述
  const lastCommitDescription = state.lastCommitDescription || '';

  const questions = state.config.questions
    .filter((name) => cliAnswers[name] === undefined)
    .map((name) => {
      const Creator = creators[name];
      const question = Creator.createQuestion(state);

      if (state.config.messages && state.config.messages[name]) {
        question.message = state.config.messages[name];
      }

      // 检查问题是否是description，如果是，添加快捷键逻辑
      if (name === 'body') {
        // 添加一个提示，告知用户可以使用快捷键
        question.message += ' (Use "Ctrl+L" to use last commit description)';
        // 为描述问题添加一个自定义的filter函数
        question.filter = (input) => {
          // 检测用户是否输入了快捷键
          if (input === 'Ctrl+L') {
            return lastCommitDescription; // 返回上次的提交描述
          }
          return input;
        };
      }
      return question;
    })
    .filter(Boolean); // 移除可能的undefined值

  return questions;
};

module.exports = createQuestions;
