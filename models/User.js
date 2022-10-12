//might try types
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        Reactions: [],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

UserSchema.virtual('reactionCount').get(function () {
    return this.Reactions.length;
})

const User = model('User', UserSchema);

module.exports = User;