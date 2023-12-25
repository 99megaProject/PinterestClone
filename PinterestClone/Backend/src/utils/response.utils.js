const responseApi = (
  message = "Successfull",
  statusCode = 200,
  data = {},
  res
) => {
  return res.status(statusCode).json({ success: true, message, data });
};

export { responseApi };
