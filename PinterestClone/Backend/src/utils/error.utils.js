
const errorApi = (message = 'Something went wrong', statusCode = 500, res) => {
   return res.status(statusCode).json({ succss: false, message })
}

class ErrorApi extends Error {
   constructor(message = "Something went wrong", statusCode = 500, res, errors = [], stack = "") {
      super(message)
      this.message = message,
         this.data = null,
         this.statusCode = statusCode,
         this.succss = false,
         this.errors = this.errors
   }
}

export { errorApi, ErrorApi }