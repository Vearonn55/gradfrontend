import React from 'react';

interface DateRangePickerProps {
    onDateChange: (start: string, end: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const form = e.currentTarget.form!;
        const start = (form[0] as HTMLInputElement).value;
        const end = (form[1] as HTMLInputElement).value;
        onDateChange(start, end);
    };

    return (
        <form style={{ display: 'flex', gap: '0.5rem' }}>
            <input type="date" defaultValue={today} onChange={handleChange} />
            <input type="date" defaultValue={today} onChange={handleChange} />
        </form>
    );
};

export default DateRangePicker;
