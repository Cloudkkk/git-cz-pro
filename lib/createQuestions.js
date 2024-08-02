/* eslint-disable import/no-dynamic-require, global-require */
const qBody = require('./questions/body');
const qBreaking = require('./questions/breaking');
const qIssues = require('./questions/issues');
const qLerna = require('./questions/lerna');
const qScope = require('./questions/scope');
const qSubject = require('./questions/subject');
const qType = require('./questions/type');
const chalk = require('chalk');
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
      if (name === 'subject') {
        // 添加一个提示，告知用户可以使用快捷键
        question.message += chalk.blue(' (输入 "L" 使用上次暂存的message)');
        // 为描述问题添加一个自定义的filter函数
        question.filter = (input) => {
          // 检测用户是否输入了快捷键
          if (input === 'L') {
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
