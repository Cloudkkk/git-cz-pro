const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');
const formatCommitMessage = require('./formatCommitMessage');
const {saveLastCommitDescription} = require('./util/cache')
exports.prompter = (cz, commit) => {
  const run = async () => {
    const state = createState();

    await runInteractiveQuestions(state);
    saveLastCommitDescription(state);
    const message = formatCommitMessage(state);
    return commit(message);
  };

  run();
};
