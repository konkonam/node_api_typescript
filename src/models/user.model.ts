import { Schema, model } from 'mongoose'
import { createHash } from 'crypto'

interface UserInterface {
    email: string
    username: string
    password: string
}

const User = new Schema<UserInterface>({
    email: { type: String, index: { unique: true }, required: true },
    username: { type: String, index: { unique: true }, required: true },
    password: { type: String, required: true }
})

User.methods('checkPassword', function(password: string) {
    const hashedPassword = createHash('sha256').update(password).digest('hex')

    if(hashedPassword === this.password) {
        return true
    }

    return false
}

User.pre('save', function() {
    this.password = createHash('sha256').update(this.password).digest('hex')
})

export default model('User', User)