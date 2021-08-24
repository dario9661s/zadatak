// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'universal-cookie';
import axios from "axios"
import cookie from 'cookie';



type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  
  axios
        .post("http://3.123.253.119:1212/login", {
          username: req.query.username,
          password: req.query.password,
        })
        .then((response) => {
          res.setHeader('Set-Cookie', cookie.serialize('auth', response.data.result, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
          }))
          
          res.send(response.data)
        
          res.end();
        })
        .catch((err) => {
          console.log(err)
        })
}
