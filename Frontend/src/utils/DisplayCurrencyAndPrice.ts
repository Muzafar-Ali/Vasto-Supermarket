const displayCurrencyAndPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
  });

  return formatter.format(price); // This returns a formatted string like "AED 100.00"
};

export default displayCurrencyAndPrice;
