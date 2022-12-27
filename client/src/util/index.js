export const getPhotoUrl = (id) =>
  `${
    process.env.REACT_APP_BASE_URL
  }/products/photo/${id}?${new Date().getTime()}`;

export const getLocalCurrency = (money) =>
  money.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
