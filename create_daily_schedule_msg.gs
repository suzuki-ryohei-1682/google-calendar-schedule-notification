function createDailyScheduleMsg(targetDay, targetUser, targetCalId, manual_run, author){
  // Initialize
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Custom the beginning of this daily message
  let msg_target = targetUser + "\n\n";
  let msg_head = "The following events are scheduled on " + targetDay.toLocaleDateString("en-US", options) + ":\n\n";
  if (manual_run == 1) {
    msg_head = ":exclamation: This job was executed by manually! :exclamation: " + "\n\n" + msg_head
  }
  let msg_tail = "\n"
                 + "* If you wanted to know more details then please import the following calendar to your Google calendar:" + "\n"
                 + "https://calendar.google.com/calendar/u/0?cid=xxx"
                 + "\n" + "* This bot was created by " + author;

  // Get events
  let msg_body = getCalendarEvents(targetDay, targetCalId, targetUser);
  msg_body = "[Daily schedule notification]" + "\n\n" + msg_body;

  // Combine all message texts
  msg = msg_target + msg_head + msg_body + msg_tail;

  // Return the response
  return msg;
}
