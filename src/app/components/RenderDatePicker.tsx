import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomProps {
  className: string,
  placeholder: string,
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const RenderDatePicker: React.FC<CustomProps> = ({ className, placeholder, onChange, selectedDate }) => {
  return (
    <DatePicker
      onChange={onChange}
      selected={selectedDate}
      className={className}
      dateFormat='dd/MM/yyyy'
      isClearable
      placeholderText={placeholder}
    />
  )
}

export default RenderDatePicker;