import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import useRecurrenceStore from "../store/useRecurrenceStore";
import RecurrenceOptions from "./RecurrenceOptions";
import CalendarPreview from "./CalendarPreview";

export default function RecurringDatePicker() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { recurrence, selectedDates, setSelectedDates } = useRecurrenceStore();

  const handleDateClick = (day) => {
    if (recurrence === "none") {
      setSelectedDates([day]);
    } else {
      generateRecurringDates(day);
    }
  };

  const generateRecurringDates = (startDate) => {
    let dates = [];
    let current = new Date(startDate);
    for (let i = 0; i < 12; i++) {
      dates.push(new Date(current));
      if (recurrence === "daily") current.setDate(current.getDate() + 1);
      if (recurrence === "weekly") current.setDate(current.getDate() + 7);
      if (recurrence === "monthly") current.setMonth(current.getMonth() + 1);
      if (recurrence === "yearly") current.setFullYear(current.getFullYear() + 1);
    }
    setSelectedDates(dates);
  };

  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelected = selectedDates.some((d) => isSameDay(d, cloneDay));
        days.push(
          <div
            key={day}
            onClick={() => handleDateClick(cloneDay)}
            className={`flex justify-center items-center w-12 h-12 cursor-pointer rounded-full m-1 transition duration-200 ${
              isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            } ${!isSameMonth(day, currentMonth) ? "text-gray-400" : ""}`}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day} className="flex justify-center">{days}</div>);
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Recurring Date Picker</h1>
      <RecurrenceOptions />
      <div className="flex justify-between items-center p-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
        <h2 className="text-lg font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
      </div>
      {renderDays()}
      <CalendarPreview />
    </div>
  );
}
