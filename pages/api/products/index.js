import connectMongo from "../../../database/conn";
import { getProducts, postProduct, putProduct, deleteProduct } from "../../../database/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  const { method } = req;

  switch (method) {
    case "GET":
      getProducts(req, res);
      break;
    case "POST":
      postProduct(req, res);
      break;
    case "PUT":
      putProduct(req, res)
      break;
    case "DELETE":
      deleteProduct(req, res)
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed `);
      break;
  }
}
