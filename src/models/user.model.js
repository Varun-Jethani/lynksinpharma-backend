import mongoose from "mongoose";

;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    address: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    searchHistory:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  ],
    cart:[
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    isGoogleUser: {
    type: Boolean,
    default: false
  },

  },
  
  { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);
export default userModel;
