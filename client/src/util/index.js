export const getPhotoUrl = (id) =>
  `${
    process.env.REACT_APP_BASE_URL
  }/products/photo/${id}?${new Date().getTime()}`;

export const getLocalCurrency = (money) =>
  money.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });

export const getDate = (date = new Date()) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  return `${date.getFullYear()}-${month}-${day}`;
};
