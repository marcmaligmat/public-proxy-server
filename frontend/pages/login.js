import React, { useState } from "react"
import Router from "next/router"

export async function getServerSideProps(context) {
  const siteCookie = context.req.cookies["ClintProxy"] ? true : false

  if (siteCookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { siteCookie },
  }
}

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const credentials = { email, password }
    console.log(email, password)
    // const user = await axios.post("/api/auth/login", credentials)
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      console.log(data.message)
      if (data.message === "Success!") {
        Router.push("/")
      }
    } catch (err) {
      console.log(err)
    }

    // console.log(user);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Enter password</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mt-4">
            <div>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button className="px-6 py-2 m-auto mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
