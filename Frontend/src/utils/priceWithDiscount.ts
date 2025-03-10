const priceWithDiscount = (price: number, discount: number) => {
  const discountPrice = Math.round(price - (price * discount) / 100);
  return discountPrice;
};

export default priceWithDiscount