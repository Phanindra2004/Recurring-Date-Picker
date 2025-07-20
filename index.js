import RecurringDatePicker from '../components/RecurringDatePicker';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          📅 Recurring Date Picker
        </h1>
        <p className="text-gray-500 mt-2">
          Build and preview custom recurring dates easily.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <RecurringDatePicker />
      </div>
    </div>
  );
}
