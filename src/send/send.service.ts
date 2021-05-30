import {FIRSTVAL, KEY, lASTVAL0, lASTVAL1, lASTVAL2, lASTVAL3, SECONDVAL} from "../config/env";
const {shipping} = require('../config/db');
class SendServices {
    public async status(id_shippings: string) {
        try {
            const shipp = await shipping.findOne({                
                    where: {id: id_shippings}
            });
            const start = `${shipp.origin_lat},${shipp.origin_long}`;
            const dest  = `${shipp.end_lat},${shipp.end_long}`;
            const axios = require("axios");
            const config = {
                method: "get",
                url:  `${FIRSTVAL}=${start}${SECONDVAL}=${dest}${lASTVAL0}=${lASTVAL1}=${lASTVAL2}=${KEY}${lASTVAL3}=km`,
                headers: {
                    "Content-Type": "application/json",
                },
                };
            const response:any = await axios(config);
            let responseData= {
                "cliente": shipp.customer,
                "descripción": shipp.descrip,
                "estatus": shipp.status,
                "tiempo": ` ${response.data.resourceSets[0].resources[0].results[0].travelDuration} min`,
                "ubicacion actual": shipp.current_lat,
                "ubicacion de destino": shipp.current_long,
            }
            return [{
                success: 'Status show',
                responseData
            }];
        }
        catch(error){
            return [{
                success: 'Status has not been sent.',
                error
            }];
        }
    }
    public async sendshipping(shipping_value: any) {
        try {
            const start = `${shipping_value.origin_lat},${shipping_value.origin_long}`;
            const dest  = `${shipping_value.end_lat},${shipping_value.end_long}`;
            const axios = require("axios");
            const config = {
                method: "get",
                url:  `${FIRSTVAL}=${start}${SECONDVAL}=${dest}${lASTVAL0}=${lASTVAL1}=${lASTVAL2}=${KEY}${lASTVAL3}=km`,
                headers: {
                    "Content-Type": "application/json",
                },
                };
            const response:any = await axios(config);
            if(parseFloat(response.data.resourceSets[0].resources[0].results[0].travelDistance)<20){
                const ship = await shipping.create(shipping_value);
                return {
                    status: "success",
                    ship
                };
            } else{
                return [{
                    success: 'send shipping failed > 20 km',
                }];
            }
        }
        catch(error){
            return [{
                success: 'send shipping failed',
                error
            }];
        }
    }
    public async sendshippingput(shipping_value: any, id_shipping:any) {
        try {
            const ship = await shipping.update(shipping_value,{
                where:{id:id_shipping}
            });
            return {
                status: "success",
                ship
            };                
        }
        catch(error){
            return [{
                success: 'send shipping failed',
                error
            }];
        }
    }
}
export default new SendServices()
