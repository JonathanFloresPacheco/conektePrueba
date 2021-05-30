// import { TWILIO_API_KEY_MESSAGES, TWILIO_API_KEY_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_API_SECRET_TOKEN, TWILIO_PHONE } from '../config/env'
// import usersService from '../users/users.service'
// import twilio from 'twilio'
// import { authPool } from '../database/db'
// const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_MESSAGES)

class SendServices {
    public async status(id_shippings: string) {
        try {
            return [{
                success: 'Status has not been sent.'
            }];
        }
        catch(error){
            return [{
                success: 'Status has not been sent.',
                error
            }];
        }
    }
}
export default new SendServices()
