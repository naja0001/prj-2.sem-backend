import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const QuranLessonCalendar = () => {
  const localizer = momentLocalizer(moment);

  // Quran lesson schedule events
  const myEventsList = [
    {
      title: "Womens Quran Lesson",
      start: new Date(2023, 11, 12, 16, 0), // Tuesday, Dec 12th, 2023, 4:00 PM
      end: new Date(2023, 11, 12, 19, 0), // Tuesday, Dec 12th, 2023, 7:00 PM
      allDay: false,
    },
    {
      title: "Womens Quran Lesson",
      start: new Date(2023, 11, 14, 16, 0), // Thursday, Dec 14th, 2023, 4:00 PM
      end: new Date(2023, 11, 14, 19, 0), // Thursday, Dec 14th, 2023, 7:00 PM
      allDay: false,
    },
    {
      title: "Mens Quran Lesson",
      start: new Date(2023, 11, 12, 19, 0), // Tuesday, Dec 12th, 2023, 7:00 PM
      end: new Date(2023, 11, 12, 21, 0), // Tuesday, Dec 12th, 2023, 9:00 PM
      allDay: false,
    },
    {
      title: "Mens Quran Lesson",
      start: new Date(2023, 11, 14, 19, 0), // Thursday, Dec 14th, 2023, 7:00 PM
      end: new Date(2023, 11, 14, 21, 0), // Thursday, Dec 14th, 2023, 9:00 PM
      allDay: false,
    },
    // Add events for other schedules...
  ];

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
      />
    </div>
  );
};

export default QuranLessonCalendar;
