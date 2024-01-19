import React from 'react';

const Form = ({ onClose, date }) => {
  return (
    <div className="form">
      <h3>{date.toLocaleDateString()}</h3>
      <button onClick={onClose}>Zatvori</button>
    </div>
  );
};

export default Form;