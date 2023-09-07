// ****************************************************
// * Get API Token from  : https://api.slack.com/apps/xxx/install-on-team?
// * Get Calendar ID from: https://calendar.google.com/calendar/u/0/r/settings/calendar/xxx
// ****************************************************
function main() {
  // Manual run flag 0=auto , 1=manual
  manual_run = 0;

  // Set a slack token for Posting API
  let slackToken = 'xoxb-[Please type your slack token ID]';

  //// Define slack app with the slack token
  let slackApp = SlackApp.create(slackToken);

  // The target channel to get Slack bot messages (If it needed then you can get notifications by identifying your Slack ID)
  //let channelId = "#su_vn_bot_test";
  let channelId = "#iv_internal_schedule_notification";

  // Set the target date
  let targetDay = new Date();

  // Get the target Google Calendar
  // Target calendar = iv release calendar
  let targetCalId = "[Please type your group calendar ID]@group.calendar.google.com"

  // Target user
  // 1: format for group = <!subteam^group_id>
  // 2: format for user = <@user_id> : Refer the member ID from the Slack profile
  let su = "<@12345abc>";
  let author = su;
  let targetUser = su;

  // 1: Daily messages
  let msg_daily = createDailyScheduleMsg(targetDay, targetUser, targetCalId, manual_run, author);
  slackApp.postMessage(channelId, msg_daily);

  // 2: Weekly messages that will be posted every Monday and Friday
  // getDay ... 0: Sunday / 1: Monday / 6: Saturday
  if (targetDay.getDay() == 1 || targetDay.getDay() == 5) {
    let msg_weekly = createWeeklyScheduleMsg(targetDay, targetUser, targetCalId, manual_run, author);
    slackApp.postMessage(channelId, msg_weekly);
  }
}
