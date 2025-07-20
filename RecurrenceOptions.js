import useRecurrenceStore from '../store/useRecurrenceStore';

export default function RecurrenceOptions() {
  const {
    recurrence,
    setRecurrence,
    interval,
    setInterval,
    weekdays,
    toggleWeekday,
    monthlyPattern,
    setMonthlyPattern,
  } = useRecurrenceStore();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg">Recurrence Options</h3>

      {/* Buttons for Recurrence */}
      <div className="flex gap-2 mt-2">
        {['daily', 'weekly', 'monthly', 'yearly'].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded border ${
              recurrence === type ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setRecurrence(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Interval */}
      <div className="mt-4">
        <label className="block mb-1">
          Repeat every {interval} {recurrence}(s):
        </label>
        <input
          type="number"
          className="border rounded p-1 w-20"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
        />
      </div>

      {/* Weekly – Choose weekdays */}
      {recurrence === 'weekly' && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {days.map((day, idx) => (
            <button
              key={day}
              className={`px-3 py-1 border rounded ${
                weekdays.includes(idx)
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => toggleWeekday(idx)}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* Monthly Patterns */}
      {recurrence === 'monthly' && (
        <div className="mt-4">
          <label>
            <input
              type="radio"
              name="monthlyPattern"
              checked={monthlyPattern === 'day'}
              onChange={() => setMonthlyPattern('day')}
            />
            Same date each month
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="monthlyPattern"
              checked={monthlyPattern === 'weekday'}
              onChange={() => setMonthlyPattern('weekday')}
            />
            Same weekday each month (e.g., 2nd Tuesday)
          </label>
        </div>
      )}
    </div>
  );
}
