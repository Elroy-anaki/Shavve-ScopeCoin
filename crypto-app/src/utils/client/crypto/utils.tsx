// This file contanis utils for display values pretty in the CryptoRealTimePrices

export const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US');
  };

export const getPriceChangeStatus = (previous: number | undefined, current: number | undefined): string => {
    if (previous === undefined || current === undefined) return "neutral";
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "neutral";
  };

 export const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return "-";
    
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    
    if (num < 0.01) return num.toFixed(8);
    if (num < 1) return num.toFixed(4);
    return num.toFixed(2);
  };

  export const formatPercentChange = (previous: number | undefined, current: number | undefined): string => {
      if (previous === undefined || current === undefined) return "0.00%";
      
      const percentChange = ((current - previous) / previous) * 100;
      const sign = percentChange > 0 ? '+' : '';
      return `${sign}${percentChange.toFixed(2)}%`;
    };