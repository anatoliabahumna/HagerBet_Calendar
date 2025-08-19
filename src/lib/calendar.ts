import { writable } from 'svelte/store';
import { EtDatetime } from 'abushakir';

export interface EthiopicDate {
  year: number;
  month: number;
  day: number;
}

export interface DayCell {
  date: Date;
  ethiopian: EthiopicDate;
  isToday: boolean;
}

export const ethiopianMonths = [
  'መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር',
  'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ',
  'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'
];

function toEthiopian(date: Date): EthiopicDate {
  const et: any = new EtDatetime(date.getTime());
  return { year: et.date.year, month: et.date.month, day: et.date.day };
}

export function formatEthiopian(date: Date): string {
  const et = toEthiopian(date);
  return `${ethiopianMonths[et.month - 1]} ${et.day}, ${et.year}`;
}

function createViewStore() {
  const today = new Date();
  const { subscribe, set, update } = writable(today);
  return {
    subscribe,
    next: () => update(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)),
    prev: () => update(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)),
    today: () => set(today)
  };
}

export const viewDate = createViewStore();

export function getMonthDays(view: Date): (DayCell | null)[] {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const last = new Date(view.getFullYear(), view.getMonth() + 1, 0);
  const days: (DayCell | null)[] = [];
  const start = first.getDay();
  for (let i = 0; i < start; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    const date = new Date(view.getFullYear(), view.getMonth(), d);
    days.push({
      date,
      ethiopian: toEthiopian(date),
      isToday:
        date.getFullYear() === (new Date()).getFullYear() &&
        date.getMonth() === (new Date()).getMonth() &&
        date.getDate() === (new Date()).getDate()
    });
  }
  return days;
}

export function convertGregorian(input: string): string {
  if (!input) return '';
  const date = new Date(input);
  if (isNaN(date.getTime())) return 'Invalid date';
  return formatEthiopian(date);
}

export function convertEthiopian(year: number, month: number, day: number): string {
  try {
    const et: any = new EtDatetime({ year, month, day, hour: 0, minute: 0, second: 0 });
    const g = new Date(et.moment);
    return g.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (err) {
    return 'Invalid date';
  }
}


export function ethiopianMonthYear(date: Date): string {
  const et = toEthiopian(date);
  return `${ethiopianMonths[et.month - 1]} ${et.year}`;
}

