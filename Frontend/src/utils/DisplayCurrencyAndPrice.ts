const displayCurrencyAndPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
  });

  return formatter.format(price); // This returns a formatted string like "AED 100.00"
};

export default displayCurrencyAndPrice;

// const displayCurrencyAndPrice = (price: number) => {
//   // Format the number with 2 decimal places (without currency symbol)
//   const formattedPrice = new Intl.NumberFormat('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(price);

//   return formattedPrice
// };

// export default displayCurrencyAndPrice;