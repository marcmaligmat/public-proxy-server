/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie"

export default async function (req, res) {
  const { cookies } = req

  const jwt = cookies.ClintProxy

  if (!jwt) {
    return res.json({ message: "Bro you are already not logged in..." })
  } else {
    const serialised = serialize("ClintProxy", null, {
      httpOnly: true,
      secure: false,
      sameSite: false,
      maxAge: -1,
      path: "/",
    })

    res.setHeader("Set-Cookie", serialised)

    res.status(200).json({ message: "Successfuly logged out!" })
  }
}
