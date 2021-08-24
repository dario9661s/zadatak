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
         
    axios
    .post(
      "http://3.123.253.119:1212/project",
      {
        title: req.query.title,
        description: req.query.description,
        image: req.query.image,
        video: req.query.video,
        goal: Number(req.query.goal),
      },
      {
        headers: {
          Authorization: `token ${req.cookies.auth}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data)
 
    })
    .catch((err) => {
      // console.log(err)
      res.send(err)
    })
}
