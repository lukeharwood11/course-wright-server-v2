const mongoose = require('mongoose');
const { Schema } = mongoose;
// ex.
// const userSchema = new Schema({
//   title:  String, // String is shorthand for {type: String}
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });

// [docs](https://mongoosejs.com/docs/schematypes.html]
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateJoined: { type: Date, default: Date.now },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: String,
    homePageId: String,
    photoId: String,
});

const activeUserSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    refreshToken: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const ActiveUser = mongoose.model("ActiveUser", activeUserSchema);

module.exports = { User, ActiveUser };
