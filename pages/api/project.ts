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

    
    console.log(req.cookies.auth);

            
    axios
    .get("http://3.123.253.119:1212/project", {
      headers: {
        Authorization: `token ${req.cookies.auth}`,
      },
    })
    .then((response) => {
      res.send(response.data)
      let token = response.data.result
    //   console.log(token)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
}
