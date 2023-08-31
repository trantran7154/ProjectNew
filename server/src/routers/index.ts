import {
    Request,
    Response,
    NextFunction,
    Application,
    ErrorRequestHandler,
  } from "express";
  import createHttpError from "http-errors";

  import productionCore2 from './core2/product.router'
  import userCore1 from './core1/auth.router'
  
  
  // import fireBaseRouter from "../routers/firebase/noftification.router";
  
  const router = (app: Application) => {
    app.use(productionCore2);
    app.use(userCore1);
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        status: err.status || 500,
        message: err.message,
      });
    };
  
  
    app.use(errorHandler);
  };
  
  export default router;