export interface AlertItem {
    AlertID: number;
    ProductID: number;
    AlertType: 'PriceExceeded' | 'NearExpiry';
    AlertDateTime: string;
    Status: 'Pending' | 'Resolved';
}
