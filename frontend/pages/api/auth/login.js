import { sign } from "jsonwebtoken"
import { serialize } from "cookie"

const api_host = process.env.NEXT_PUBLIC_SERVERSIDE_API_HOST

const secret = process.env.JWT_SECRET
/* eslint-disable import/no-anonymous-default-export */
export default async function (req, res) {
  const { password } = req.body

  console.log(password)
  const username = "marcmaligmat@gmail.com"
  try {
    const response = await fetch(`http://${api_host}/auth/`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if (data.token) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
          username: username,
        },
        secret
      )

      const serialised = serialize("ClintProxy", token, {
        credentials: true,
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      })

      res.setHeader("Set-Cookie", serialised)

      res.status(200).json({ message: "Success!" })
    } else {
      res.json({ message: "Invalid credentials!" })
    }
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
