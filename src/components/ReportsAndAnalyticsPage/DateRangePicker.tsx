import React, { useState } from 'react';


interface DateRangePickerProps {
    onDateChange: (startDate: string, endDate: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        onDateChange(e.target.value, endDate);
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        onDateChange(startDate, e.target.value);
    };

    return (
        <div className="date-range-picker">
            <div className="date-input">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={handleStartChange}
                    className="form-input"
                />
            </div>
            <div className="date-input">
                <label htmlFor="endDate">End Date:</label>
                <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={handleEndChange}
                    className="form-input"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
