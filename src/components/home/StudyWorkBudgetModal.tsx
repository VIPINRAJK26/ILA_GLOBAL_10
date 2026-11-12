import React, { useMemo, useState } from 'react';
import { XIcon } from '../common/Icons';

const currencyByCountry: Record<string, string> = {
  Germany: 'EUR',
  Canada: 'CAD',
  'United Kingdom': 'GBP',
  Ireland: 'EUR',
};

interface StudyWorkBudgetModalProps {
  country: string;
  onClose: () => void;
}

export const StudyWorkBudgetModal: React.FC<StudyWorkBudgetModalProps> = ({ country, onClose }) => {
  const currency = currencyByCountry[country] || 'EUR';
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyWage, setHourlyWage] = useState(15);
  const [monthlyExpenses, setMonthlyExpenses] = useState(1000);
  const [monthlyTuition, setMonthlyTuition] = useState(0);
  const estimatedIncome = useMemo(() => hoursPerWeek * hourlyWage * 4.33, [hoursPerWeek, hourlyWage]);
  const remaining = estimatedIncome - monthlyExpenses - monthlyTuition;
  const money = new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="budget-modal-title" className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{country} • Monthly estimate</p>
            <h2 id="budget-modal-title" className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Study and work budget</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Adjust the assumptions to estimate your monthly income and costs in {currency}.</p>
          </div>
          <button type="button" aria-label="Close budget calculator" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><XIcon className="h-5 w-5" /></button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Work hours per week
            <input type="number" min="0" max="60" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Hourly pay ({currency})
            <input type="number" min="0" value={hourlyWage} onChange={(e) => setHourlyWage(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Monthly living costs ({currency})
            <input type="number" min="0" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Monthly tuition / fees ({currency})
            <input type="number" min="0" value={monthlyTuition} onChange={(e) => setMonthlyTuition(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><p className="text-xs text-slate-500 dark:text-slate-400">Estimated monthly work income</p><p className="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-300">{money.format(estimatedIncome)}</p></div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><p className="text-xs text-slate-500 dark:text-slate-400">After entered costs</p><p className={`mt-1 text-lg font-bold ${remaining >= 0 ? 'text-indigo-700 dark:text-indigo-300' : 'text-rose-700 dark:text-rose-300'}`}>{money.format(remaining)}</p></div>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">Planning estimate only. Actual take-home pay, permitted work hours, tuition, taxes, and living costs depend on your visa, location, course, and personal circumstances.</p>
      </section>
    </div>
  );
};
