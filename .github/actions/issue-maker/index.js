const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    //get inputs from action.yml
    const issueTitle = core.getInput("issue-title");
    const jokeBody = core.getInput("joke");
    const token = core.getInput("repo-token");
    console.log("jokeBody" + jokeBody);

    const octokit = new github.getOctokit(token);

    //https://github.com/githubtraining/write-javascript-actions/issues/36?msclkid=b65d4539b61311ecae9087e4f6a7a553
    // change "octokit.issues.create" to "octokit.rest.issues.create"
    const newIssue = await octokit.rest.issues.create({
      repo: github.context.repo.repo,
      owner: github.context.repo.owner,
      title: issueTitle,
      body: jokeBody
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();