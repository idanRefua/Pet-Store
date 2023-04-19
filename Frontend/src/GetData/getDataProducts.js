function getProductInfo(productsArray, id) {
  let productInfo = productsArray.find((product) => product._id === id);
  if (!productInfo) {
    return undefined;
  }
  return productInfo;
}

export { getProductInfo };
