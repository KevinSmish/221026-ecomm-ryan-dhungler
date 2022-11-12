export const setErrorMessage = (response, errorMessage, status = 400) =>
  response.status(status).json({ error: errorMessage });

export const unauthorizedError = (response) =>
  response.status(401).json({ error: "Пользователь не авторизован" });
