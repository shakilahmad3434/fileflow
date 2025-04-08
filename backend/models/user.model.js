const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxlength: 60
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email Address"
    ]
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  storageUsed: {
    type: Number,
    default: 0
  },
  storageLimit: {
    type: Number,
    default: 104857600
  },
  plan: {
    type: String,
    enum: ['free','premium', 'business'],
    default: 'free'
  },
  lastLogin: 
  { 
    type: Date
  }
}, {timestamps: true})

userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await model('User').countDocuments({ email: this.email });
    if (count > 0) {
      return next(new Error('Email already exists'));
    }
  }
  next();
});


userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

const UserModel = model('User', userSchema)

module.exports = UserModel