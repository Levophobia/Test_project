// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "../../database/conn"


export default function handler(req, res) {
  connectMongo()
  
}
