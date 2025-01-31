import React from 'react';
import './AnalyticsPreviewWidget.css';

const AnalyticsPreviewWidget: React.FC = () => {

    return (
        <div className="analytics-preview-widget">
            <h3>Analytics Preview</h3>
            <div className="chart-placeholder">
                <p>Chart Placeholder</p>
            </div>
        </div>
    );
};

export default AnalyticsPreviewWidget;
