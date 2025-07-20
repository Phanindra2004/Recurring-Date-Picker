import create from 'zustand';

const useRecurrenceStore = create((set) => ({
  startDate: null,
  endDate: null,
  recurrence: 'daily',
  interval: 1,
  weekdays: [],
  monthlyPattern: 'day',
  selectedDates: [],
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrence: (type) => set({ recurrence: type }),
  setInterval: (num) => set({ interval: num }),
  toggleWeekday: (day) =>
    set((state) => ({
      weekdays: state.weekdays.includes(day)
        ? state.weekdays.filter((d) => d !== day)
        : [...state.weekdays, day],
    })),
  setMonthlyPattern: (pattern) => set({ monthlyPattern: pattern }),
  setSelectedDates: (dates) => set({ selectedDates: dates }),
}));

export default useRecurrenceStore;
