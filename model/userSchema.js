import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  role: String,
  password: String,
  adress: String,
  zipcode: String,
  city: String
  
});

const Users = models.user || model("user", userSchema);

export default Users;