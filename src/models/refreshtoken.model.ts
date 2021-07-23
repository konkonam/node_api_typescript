import { Schema, model } from "mongoose";
import { randomBytes } from 'crypto'

interface RefreshTokenInterface {
    token: string
    owner: string
    expires: Date
}

const RefreshToken = new Schema<RefreshTokenInterface>({
    token: { type: String, required: true },
    owner: { type: String, required: true },
    expires: { type: String, required: true },
})

RefreshToken.pre('save', function(next) {
    
    var date = new Date();
    date.setDate(date.getDate() + 1);

    if(!this.token) {
        this.token = randomBytes(64).toString('hex')
    }

    if(!this.expires) {
        this.expires = date
    }

    next()
})

export default model("RefreshToken", RefreshToken)