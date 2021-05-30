import { Router } from 'express'
import sendCtrl from './send.ctrl'
export const sendRouter = Router()
sendRouter
.get('/status/:id_shippings',sendCtrl.status)
.post('/sendshipping', sendCtrl.sendshipping)
.put('/sendshipping/:id_shipping', sendCtrl.sendshippingput)
 