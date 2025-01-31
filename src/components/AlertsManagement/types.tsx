export interface AlertItem {
    id: number;
    type: 'PriceThresholdExceeded' | 'NearExpiry';
    message: string;
    date: string; // veya Date tipinde de tutabilirsiniz
    resolved: boolean; // Çözümlenmiş mi?
}

