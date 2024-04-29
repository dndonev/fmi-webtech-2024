type TCurrency = 'USD' | 'EUR' | 'JPY';

function convert(amount: number, fromCurrency: TCurrency, toCurrency: TCurrency) {

    const conversionRates = {
        'USD': { EUR: 1.1, JPY: 115, USD: 1 },
        'EUR': { USD: 1.1, JPY: 115, EUR: 1 },
        'JPY': { USD: 0.015, EUR: 0.015, JPY: 1 },
    };

    return amount * conversionRates[fromCurrency][toCurrency];
}

convert(5, 'USD', 'EUR');