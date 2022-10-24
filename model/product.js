import { Schema, models, model } from "mongoose";

const productSchema = new Schema({
  productname: String,
  avatar: String,
  price: Number,
  category: String,
  status: String,
});

const Products = models.product || model("product", productSchema);
export default Products;