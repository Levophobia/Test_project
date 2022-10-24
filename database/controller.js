import { BiCalendarCheck } from "react-icons/bi";
import Products from "../model/product";
import Users from "../model/userSchema"

export async function getProducts(req, res) {
  try {
    const products = await Products.find({});

    if (!products) return res.status(404).json({ error: "Data not found" });
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ error: "Error while fetching data" });
  }
}

export async function getProduct(req, res) {
  try {
    const { productId } = req.query;

    if (productId) {
      const product = await Products.findById(productId);
      res.status(200).json(product);
    }
    res.status(404).json({ error: "Product not found" });
  } catch (error) {
    res.status(404).json({ error: "Could not get product" });
  }
}
export async function getUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(404).json({ error: "Could not get user" });
  }
}

export async function postProduct(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided" });
    Products.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

export async function putProduct(req, res) {
  try {
    const { productId } = req.query;
    const formData = req.body;

    if (productId && formData) {
      await Products.findByIdAndUpdate(productId, formData);
      res.status(200).json(formData);
    }
    res.status(404).json({ error: "Product not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error in updating data" });
  }
}

export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(formData);
    }
    res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error in updating data" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { productId } = req.query;

    if (productId) {
      const product = await Products.findByIdAndDelete(productId);
      return res.status(200).json({ deleted: productId });
    }

    res.status(404).json({ error: "Product not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error in deleting data" });
  }
}
