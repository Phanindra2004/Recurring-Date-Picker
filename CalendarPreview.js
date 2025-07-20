import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useRecurrenceStore from '../store/useRecurrenceStore';

export default function CalendarPreview() {
  const { selectedDates } = useRecurrenceStore();

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <h3 className="text-lg font-semibold mb-2">Preview</h3>
      <Calendar
        tileClassName={({ date }) =>
          selectedDates.some(
            (d) => new Date(d).toDateString() === date.toDateString()
          )
            ? 'bg-blue-200 rounded-full'
            : null
        }
      />
    </div>
  );
}
