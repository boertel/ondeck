import React from 'react'

export default function Actions() {
  console.log('actions')
  return (
    <a href="https://slack.com/oauth/v2/authorize?scope=chat:write&client_id=2629737000.2155013719975">
      <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
    </a>
  )
}
