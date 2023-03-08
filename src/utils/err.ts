export const CError = (err: any, title: string) => {
  console.error(err);
  const { name, message } = err;
  if (name && message) {
    return {
      name,
      message,
    };
  } else {
    return {
      name: `${title}`,
      message: "Error indefinido",
    };
  }
};
