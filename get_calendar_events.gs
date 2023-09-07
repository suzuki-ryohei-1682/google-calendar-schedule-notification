function getCalendarEvents(targetDay, targetCalId) {
  // Get the calendar
  let myCalendar = CalendarApp.getCalendarById(targetCalId);
 
  // Get the target date's events
  let myEvent = myCalendar.getEventsForDay(targetDay);

  // Create the initial message to be notified
  let msg = "";

  for(let i = 0; i < myEvent.length; i++){
    // Get the start and end day
    let startDate = myEvent[i].getStartTime().toDateString();
    let endDate = myEvent[i].getEndTime().toDateString();

    // Get the start and end time
    let startH = myEvent[i].getStartTime().getHours();
    if(startH < 10) startH = "0" + startH;
    let startM = myEvent[i].getStartTime().getMinutes();
    if(startM < 10) startM = "0" + startM;
    let endH = myEvent[i].getEndTime().getHours();
    if(endH < 10) endH = "0" + endH;
    let endM = myEvent[i].getEndTime().getMinutes();
    if(endM < 10) endM = "0" + endM;   
    msg += " - " + startH +":"+  startM + " to " + endH +":"+  endM + " VNT = " + myEvent[i].getTitle() +  "\n";
  }

  if (msg == "") {
    msg = "No event! :tada:" + "\n";
  }

  // Return a response
  return msg;
}
