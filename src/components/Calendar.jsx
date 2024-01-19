import React, { useState } from 'react';
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import Form from './Form';

const Calendar = ({ onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    let data = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > totalDays) {
          week.push(null);
        } else {
          week.push(new Date(year, month, dayCounter));
          dayCounter++;
        }
      }
      data.push(week);
    }

    return data;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedDate(null);
  };
  const formatDate = (date, options) => {
    return date.toLocaleString('default', options);
  };

  const monthData = getMonthData();

  return (
    <div className="calendar-container">
      <div className="header">
        <button onClick={prevMonth}><GrCaretPrevious /></button>
        <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}><GrCaretNext /></button>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            {['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'].map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthData.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((date, dateIndex) => (
                <td
                  key={dateIndex}
                  className={date ? (selectedDate && date.getTime() === selectedDate.getTime() ? 'selected-date' : '') : 'empty'}
                  onClick={() => date && handleDateClick(date)}
                >
                  {date ? date.getDate() : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <Form date={selectedDate} onClose={closeForm} />
      )}
    </div>
  );
};

export default Calendar;
