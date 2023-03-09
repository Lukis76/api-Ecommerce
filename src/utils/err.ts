import { Response } from "express";

export const CError = (err: any, title: string) => {
  // console.error(err);
  const { name, message } = err;
  if (name && message) {
    console.log(" one => ", name, message);
    return {
      name,
      message
    }
  } else {
    console.log(" two => ", name, message);
    return {
      name: `${title}`,
      message: "Error indefinido",
    };
  }
};

export const CustomError = (res: Response, err: any, customName: string) => {
  res.status(404).json({
    status: "Failed",
    code: 404,
    name: `${err?.name} || ${customName}`,
    message: err?.message,
  });
};
