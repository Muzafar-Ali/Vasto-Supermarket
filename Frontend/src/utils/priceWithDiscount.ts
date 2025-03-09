const priceWithDiscount = (price: number, discount: number) => {
  console.log('price', price);
  console.log('discount', discount);
  
  const discountPrice = Math.round(price - (price * discount) / 100);
  console.log('discountPrice', discountPrice);
  return discountPrice; // ✅ Return the correct discounted price
};

export default priceWithDiscount