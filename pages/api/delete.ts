// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from "axios"

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {       
    console.log(req.body.id);
    axios
    .delete(`http://3.123.253.119:1212/project/${req.query.id}`, {
      headers: {
        Authorization: `token ${req.cookies.auth}`,
      },
    })
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
}
