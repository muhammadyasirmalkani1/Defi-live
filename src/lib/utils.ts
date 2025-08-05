import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Crypto utility functions
export const cryptoUtils = {
  // Format currency with proper decimals
  formatCurrency: (amount: number, currency: string = 'USD', decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  },

  // Format crypto amounts
  formatCrypto: (amount: number, symbol: string, decimals: number = 8): string => {
    const formatted = amount.toLocaleString(undefined, {
      minimumFractionDigits: Math.min(decimals, 2),
      maximumFractionDigits: decimals,
    });
    return `${formatted} ${symbol}`;
  },

  // Calculate percentage change
  calculatePercentageChange: (oldValue: number, newValue: number): number => {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
  },

  // Format percentage with color coding
  formatPercentage: (percentage: number, showSign: boolean = true): { 
    formatted: string; 
    color: string; 
    isPositive: boolean 
  } => {
    const isPositive = percentage >= 0;
    const sign = showSign && isPositive ? '+' : '';
    const formatted = `${sign}${percentage.toFixed(2)}%`;
    const color = isPositive ? 'text-crypto-green' : 'text-crypto-red';
    
    return { formatted, color, isPositive };
  },

  // Generate random price movement
  generatePriceMovement: (currentPrice: number, volatility: number = 0.02): number => {
    const change = (Math.random() - 0.5) * 2 * volatility;
    return currentPrice * (1 + change);
  },

  // Format market cap
  formatMarketCap: (marketCap: number): string => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(1)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(1)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(1)}M`;
    } else if (marketCap >= 1e3) {
      return `$${(marketCap / 1e3).toFixed(1)}K`;
    }
    return `$${marketCap.toFixed(2)}`;
  },

  // Validate crypto address (basic validation)
  validateAddress: (address: string, type: 'bitcoin' | 'ethereum' | 'generic' = 'generic'): boolean => {
    switch (type) {
      case 'bitcoin':
        return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) || /^bc1[a-z0-9]{39,59}$/.test(address);
      case 'ethereum':
        return /^0x[a-fA-F0-9]{40}$/.test(address);
      default:
        return address.length >= 25 && address.length <= 62;
    }
  },

  // Calculate trading fees
  calculateTradingFee: (amount: number, feePercentage: number = 0.1): number => {
    return amount * (feePercentage / 100);
  },

  // Generate portfolio allocation colors
  getAllocationColor: (index: number): string => {
    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--crypto-green))', 
      'hsl(var(--crypto-blue))',
      'hsl(var(--crypto-orange))',
      'hsl(var(--crypto-purple))',
    ];
    return colors[index % colors.length];
  }
};

// Date utilities
export const dateUtils = {
  // Format time for trading
  formatTradingTime: (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  },

  // Get relative time
  getRelativeTime: (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  },

  // Generate time series data
  generateTimeSeriesData: (points: number, interval: 'minute' | 'hour' | 'day' = 'minute'): Date[] => {
    const data: Date[] = [];
    const now = new Date();
    const multiplier = interval === 'minute' ? 60000 : interval === 'hour' ? 3600000 : 86400000;

    for (let i = points - 1; i >= 0; i--) {
      data.push(new Date(now.getTime() - i * multiplier));
    }

    return data;
  }
};

// Local storage utilities
export const storageUtils = {
  // Save user preferences
  savePreferences: (preferences: Record<string, any>): void => {
    try {
      localStorage.setItem('cryptodefi_preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  // Load user preferences
  loadPreferences: (): Record<string, any> => {
    try {
      const saved = localStorage.getItem('cryptodefi_preferences');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
    }
  },

  // Save watchlist
  saveWatchlist: (cryptos: string[]): void => {
    try {
      localStorage.setItem('cryptodefi_watchlist', JSON.stringify(cryptos));
    } catch (error) {
      console.error('Failed to save watchlist:', error);
    }
  },

  // Load watchlist
  loadWatchlist: (): string[] => {
    try {
      const saved = localStorage.getItem('cryptodefi_watchlist');
      return saved ? JSON.parse(saved) : ['BTC', 'ETH', 'BNB', 'ADA'];
    } catch (error) {
      console.error('Failed to load watchlist:', error);
      return ['BTC', 'ETH', 'BNB', 'ADA'];
    }
  }
};

// Performance utilities
export const performanceUtils = {
  // Debounce function calls
  debounce: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    }) as T;
  },

  // Throttle function calls
  throttle: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
    let lastCall = 0;
    return ((...args: any[]) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func.apply(null, args);
      }
    }) as T;
  },

  // Memoize expensive calculations
  memoize: <T extends (...args: any[]) => any>(fn: T): T => {
    const cache = new Map();
    return ((...args: any[]) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(null, args);
      cache.set(key, result);
      return result;
    }) as T;
  }
};
