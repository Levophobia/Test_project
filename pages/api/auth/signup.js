import connectMongo from "../../../database/conn";
import Users from "../../../model/userSchema";
import { hash } from "bcryptjs";

export default async function handler(req, res){
    connectMongo().catch((error) => res.json({ error: "Connection failed" }));

    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Don't have form data" });
          const { username, email, role, password, adress, zipcode, city } = req.body;

          const checkexisting = await Users.findOne({ email });
        if (checkexisting)
        return res.status(422).json({ message: "User already exist" });

        Users.create(
            { username, email, role, password: await hash(password, 12), adress, zipcode, city },
            function (err, data) {
              if (err) return res.status(404).json({ err });
              res.status(201).json({ status: true, user: data });
            });

        } else {
            res
              .status(500)
              .json({ message: "HTTP method not valid only POST accepted" });
          }

}