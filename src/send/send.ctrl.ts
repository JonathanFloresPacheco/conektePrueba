import { envelope } from '../helpers/envelope'
import { Handlers } from '../helpers/handlers'
import SendServices from './send.service'
import { Request, Response } from 'express'

class Send {
    public async status(req: Request, res: Response) {
        const id_shippings = req.params.id_shippings;
        try {
            const response = await SendServices.status(id_shippings);
            const resData = Handlers.dataHandler(response, "GET");
            res.status(resData.code).json(envelope(resData.data));
        } catch (error) {
            const resError = Handlers.errorHandler({ error: error.message }, "BAD_REQUEST");
            res.status(resError.code).json(envelope(resError.data));
        }
    }  
    public async sendshipping (req: Request, res: Response) {
        try {
          const resultId = await SendServices.sendshipping(req.body)
          const resData = Handlers.dataHandler(resultId, 'POST')
          res.status(resData.code).json(envelope(resData.data))
        } catch (e) {
          const resError = Handlers.errorHandler(e, 'BAD_REQUEST')
          res.status(resError.code).json(envelope(resError.data))
        }
      }

      public async  sendshippingput  (req: Request, res: Response) {
          try {
              const response = await SendServices.sendshippingput(req.body,req.params.id_shipping);
              const resData = Handlers.dataHandler(response, "PATCH");
              res.status(resData.code).json(envelope(resData.data));
          } catch (error) {
              const resError = Handlers.errorHandler({error: error.message}, "BAD_REQUEST");
              res.status(resError.code).json(envelope(resError.data));
          }
      }
    
}
export default new Send()
