function getProductInfo(productsArray, id) {
  let productInfo = productsArray.find((product) => product._id === id);
  if (!productInfo) {
    return undefined;
  }
  return productInfo;
}

const getDataForCartPurchase = (productsArray, id) => {
  let finalArray = [];
  let productData = productsArray.find((product) => product._id === id);

  if (!productData) {
    return undefined;
  }

  finalArray.push(productData);
  return finalArray;
};

export { getProductInfo };
