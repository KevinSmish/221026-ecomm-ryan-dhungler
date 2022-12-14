export const getPhotoUrl = (id) =>
  `${
    process.env.REACT_APP_BASE_URL
  }/products/photo/${id}?${new Date().getTime()}`;
