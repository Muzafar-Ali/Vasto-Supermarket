const DisplayCurrencyAndPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AED',
  });
  return formatter.format(price);
}

export default DisplayCurrencyAndPrice;