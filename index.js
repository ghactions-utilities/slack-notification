'use strict'

const core = require('@actions/core');
const github = require('@actions/github');
const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook(core.getInput('webhook-url'));
const jobStatus = core.getInput('job-status')
let message = core.getInput('message');

if (!message) {
  let eventData = require(process.env.GITHUB_EVENT_PATH);
  message = eventData.commits.pop().message
}

const ghActor = github.context.actor;
const ghServerUrl = github.context.serverUrl;
const ghRepository = github.context.repo.owner + "/" + github.context.repo.repo;
const ghSha = github.context.sha;
const ghRef = github.context.ref;
const ghEventName = github.context.eventName;
const ghWorkflow = github.context.workflow;
let color;

switch (jobStatus) {
  case "success":
    color = "good";
    break;
  case "failure":
    color = "danger";
    break;
  case "cancelled":
    color = "#808080";
    break;
  default:
    color = "#000000"
}

const payload = {
  username: "GitHub Actions",
  attachments: [
    {
      color: color,
      author_name: ghActor,
      author_link: ghServerUrl + "/" + ghActor,
      footer: "Powered by @ghactions-utilities",
      fields: [
        {
          title: "Ref",
          value: ghRef,
          short: true
        },
        {
          title: "Event",
          value: ghEventName,
          short: true
        },
        {
          title: "Action URL",
          value: "<" + ghServerUrl + "/" + ghRepository + "/commit/" + ghSha + "/checks|" + ghWorkflow + ">",
          short: true
        },
        {
          title: "Commit",
          value: "<" + ghServerUrl + "/" + ghRepository + "/commit/" + ghSha + "|" + ghSha.slice(0,6) + ">",
          short: true
        },
        {
          title: "Message",
          value: message,
          short: false
        }
      ]
    }
  ]
}

function run(payload) {
  webhook.send(payload)
    .then(() => {
      console.log('Send Slack message successfully.');
    })
    .catch(error => core.setFailed(error.message));
};

run(payload);