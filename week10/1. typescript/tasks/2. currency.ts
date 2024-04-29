type Currency = 'USD' | 'EUR' | 'JPY';

function convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
    const conversionRates = {
        USD: { 'USD': 1, 'EUR': 0.85, 'JPY': 110 },
        EUR: { 'USD': 1.18, 'JPY': 129.5, 'EUR': 1 },
        JPY: { 'USD': 0.0091, 'EUR': 0.0077, 'JPY': 1 },
    };

    return amount * conversionRates[fromCurrency][toCurrency];
}

convertCurrency(100, 'EUR', 'JPY')