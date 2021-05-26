import {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express';

type AsyncMidFunc = (req:Request,res:Response,next:NextFunction)=> Promise<void>; // Async Middleware Function
// type MidFunc = (req:Request,res:Response,next:NextFunction)=> void; // Middleware Function

export default (fn: AsyncMidFunc) : RequestHandler => (req, res, next) => {
  fn(req, res, next).catch(next);
};
// .catch((err)=> next(err))
