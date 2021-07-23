import * as jwt from 'jsonwebtoken'

class TokenManager {
    createJwt = (username: string, payload = null) => {
        if(payload == null) {
            payload = {
                "username": username
            }
        }


    }    
}

export default TokenManager