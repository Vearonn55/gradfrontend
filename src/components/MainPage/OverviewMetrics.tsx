import React from 'react';

interface OverviewMetricsProps {
    totalESLs: number;
    totalAlerts: number;
    pendingPriceUpdates: number;
}

const OverviewMetrics: React.FC<OverviewMetricsProps> = ({
                                                             totalESLs,
                                                             totalAlerts,
                                                             pendingPriceUpdates
                                                         }) => {
    return (
        <div className="overview-metrics-container">
            <div className="metric-card">
                <h4>Total Active ESLs</h4>
                <p>{totalESLs}</p>
            </div>
            <div className="metric-card">
                <h4>Alerts</h4>
                <p>{totalAlerts}</p>
            </div>
            <div className="metric-card">
                <h4>Pending Price Updates</h4>
                <p>{pendingPriceUpdates}</p>
            </div>
        </div>
    );
};

export default OverviewMetrics;
