import React, { useState } from 'react';
import './RealTimeUpdatesWidget.css';

interface RealTimeUpdatesWidgetProps {

}

const RealTimeUpdatesWidget: React.FC<RealTimeUpdatesWidgetProps> = () => {
    const [price, setPrice] = useState('');

    const handleUpdate = () => {
        alert(`Price updated to: ${price}`);
        setPrice('');
    };

    return (
        <div className="realtime-updates-widget">
            <h3>Real-Time Pricing</h3>
            <div className="realtime-content">
                <input
                    type="text"
                    placeholder="Enter new price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
};

export default RealTimeUpdatesWidget;
