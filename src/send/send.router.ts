import { Router } from 'express'
import sendCtrl from './send.ctrl'
export const sendRouter = Router()
sendRouter
.get('/status/:id_shippings',sendCtrl.status)
//   .post('/message/:role', sendCtrl.sendMessage)
//   .post('/messageTemp/:role', sendCtrl.sendMessageTemp)
//   .post('/token', sendCtrl.genToken)
 