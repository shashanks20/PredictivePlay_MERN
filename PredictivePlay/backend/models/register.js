const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    Username:{
        type : String,
        required : true
    },
    Email:{
        type : String,
        required:true
    },
    Password:{
        type : String,
        required:true
    },
    Score:{
        type:Number,
        required : true
    }
})



// userSchema.pre('save',async function(next)
// {
//     console.log("hii");
//     if(this.isModified('Password'))
//     {
//         this.password = await bcrypt.hashSync(this.password, 12);
//     }
//     next();
// })

const Register = new mongoose.model("User",userSchema);

module.exports = Register;