import {RequestHandler,ErrorRequestHandler} from 'express';
import log from '@ajar/marker';
import {env} from '../utils/index'
const { White, Reset, Red } = log.constants;

export const error_handler:ErrorRequestHandler =  (err, req, res, next) => {
    log.error(err);
    if(env('NODE_ENV') !== 'production')res.status(500).json({status:err.message,stack:err.stack});
    else res.status(500).json({status:'internal server error...'});
}
export const not_found :RequestHandler =  (req, res) => {
    log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
    res.status(404).json({status:`url: ${req.url} not found...`});
}