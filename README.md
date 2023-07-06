This action is a part of [ghactions-utilities](https://github.com/ghactions-utilities) created by [trquangvinh](https://github.com/trquangvinh/).

## Slack Notification
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

A [GitHub Action](https://github.com/features/actions) to send a message to a Slack channel.

## Usage

```yml
- uses: ghactions-utilities/slack-notification@main
  with:
    # Description: Slack Webhook URL
    # Require: true
    # Type: string
    webhook-url: ''

    # Description: Workflow job status
    # Allowed values: success | failure | cancelled
    # Require: true
    # Type: string
    job-status: ''

    # Description: Slack message
    # Require: false
    # Type: string
    # If `message` not set, we will use last commit message instead of.
    message: Typing the message which you wanna send to Slack
```

# Example

```yml
name: Slack Notification

on: push

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send slack notification
        uses: ghactions-utilities/slack-notification@main
        with:
          webhook-url: ${{ secrets.WEBHOOK_URL }}
          job-status: ${{ job.status }}
          message: Hello world!
```