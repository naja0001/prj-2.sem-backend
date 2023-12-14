import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const QuranLessonCalendar = () => {
  const localizer = momentLocalizer(moment);
  const myEventsList = [];

  const startDate = moment().startOf("year");
  const endDate = moment().endOf("year");

  const addQuranLessons = (
    startDate,
    endDate,
    dayOfWeek,
    startTime,
    endTime,
    color
  ) => {
    const currentDate = startDate.clone().day(dayOfWeek);
    while (currentDate.isSameOrBefore(endDate)) {
      const startHour = startTime;
      const endHour = endTime;
      const startDateTime = currentDate.hour(startHour).toDate();
      const endDateTime = currentDate.hour(endHour).toDate();
      myEventsList.push({
        title: "Quran Lesson",
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        color: color,
      });
      currentDate.add(1, "week");
    }
  };

  // Add Quran lessons for girls (Tuesday: 16:00 - 19:00) in pink
  addQuranLessons(startDate, endDate, 2, 16, 19, "pink");

  // Add Quran lessons for boys (Thursday: 19:00 - 21:00) in blue
  addQuranLessons(startDate, endDate, 4, 19, 21, "blue");

  // Add Quran lessons for boys (Friday, Saturday, Sunday: 16:00 - 20:00) in blue
  addQuranLessons(startDate, endDate, 5, 16, 20, "blue"); // Friday
  addQuranLessons(startDate, endDate, 6, 16, 20, "blue"); // Saturday
  addQuranLessons(startDate, endDate, 7, 16, 20, "blue"); // Sunday

  // Add Tajweed lessons for girls every other Thursday (17:00 - 18:00) in pink
  const thursdays = [];
  let currentThursday = startDate.clone().startOf("week").day("Thursday");
  while (currentThursday.isSameOrBefore(endDate)) {
    thursdays.push(currentThursday.clone());
    currentThursday = currentThursday.add(2, "weeks");
  }
  thursdays.forEach((thursday) => {
    const startDateTime = thursday.hour(17).toDate();
    const endDateTime = thursday.hour(18).toDate();
    myEventsList.push({
      title: "Tajweed Lesson",
      start: startDateTime,
      end: endDateTime,
      allDay: false,
      color: "purple",
    });
  });

  return (
    <div style={{ height: "500px", margin: "50px" }}>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color, // Set color for Quran Lesson events
          },
        })}
      />
    </div>
  );
};

export default QuranLessonCalendar;
