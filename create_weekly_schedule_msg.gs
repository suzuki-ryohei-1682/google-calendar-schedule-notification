function createWeeklyScheduleMsg(startDate, targetUser, targetCalId, manual_run, author){
  // Initialize
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Set the weekly dates
  let targetDays = [];
  let date = "";
  let nextDate = startDate;

  if (nextDate.getDay() == 5) {
    nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate() + 3);
  }

  for (var i = 0;  i < 7;  i++) {
    targetDays.push(new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate() + i));
  }

  // Custom the beginning of this daily message
  let msg_target = targetUser + "\n\n";
  let msg_tail = "\n"
                 + "* This weekly notification will be sent every Monday and Friday." + "\n"
                 + "* If you wanted to know more details then please import the following calendar to your Google calendar:" + "\n"
                 + "https://calendar.google.com/calendar/u/0?cid=xxx"
                 + "\n" + "* This bot was created by " + author;

  // Get events
  let msg_body = "";
  let msg_head = "";
  if (manual_run == 1) {
    msg_head = ":exclamation: This job was executed by manually! :exclamation: " + "\n\n" + msg_head
  }
  for (var i = 0; i < targetDays.length; i++) {
    msg_head = targetDays[i].toLocaleDateString("en-US", options) + ":\n\n";
    msg_body += msg_head + getCalendarEvents(targetDays[i], targetCalId, targetUser) + "\n\n================================\n";
  }
  msg_body = "[Weekly schedule notification]" + "\n\n" + msg_body;

  // Combine all message texts
  msg = msg_target + msg_body + msg_tail;

  // Return the response
  return msg;
}
