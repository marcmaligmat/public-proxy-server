import { getDevices } from "../api_calls/device"
import Navbar from "../components/Navbar"
import Alert from "../components/Alert"
import { useRef, useMemo, createRef, useEffect } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"
import FlightIcon from "@mui/icons-material/Flight"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import { Tooltip, Button } from "@material-tailwind/react"
import { useState } from "react"

const NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST
const SERVERSIDE_API_HOST = process.env.NEXT_PUBLIC_SERVERSIDE_API_HOST
const ENDPOINT = `http://${SERVERSIDE_API_HOST}/api/device/`

export async function getServerSideProps(context) {
  const devices = await getDevices("device")

  const siteCookie = context.req.cookies["ClintProxy"] ? true : false

  if (!siteCookie) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: { devices, siteCookie },
  }
}

const Home = ({ devices }) => {
  const [showAlert, setShowAlert] = useState(false)
  useEffect(() => {
    if (!showAlert) return
    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }, [showAlert])
  const handleLogOut = async () => {
    const _cookie = await fetch("/api/auth/logout")
    Router.push("/login")
  }

  const handleResetPorts = async () => {
    const payload = { command: "reset_ports" }

    const response = await fetch("/api/drf/backend", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.status === 200) {
      setShowAlert(true)
    }
  }

  const refsById = useMemo(() => {
    const refs = {}
    devices &&
      devices.forEach((device) => {
        refs[device.id] = createRef(null)
      })
    return refs
  }, [devices])

  const handleReset = async (device) => {
    const payload = { command: "reset_ip", device }
    const response = await fetch("/api/drf/backend", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.status === 200) {
      setShowAlert(true)
    }
  }
  const handleAirplaneFix = async (device) => {
    const payload = { command: "airplane_fix", device }
    const response = await fetch("/api/drf/backend", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.status === 200) {
      setShowAlert(true)
    }
  }

  const handlePort = async (device) => {
    console.log({ device })

    const new_port = refsById[device.id].current.value
    console.log("new port 👉️", new_port)

    const payload = { command: "change_port", device, new_port }
    const response = await fetch("/api/drf/backend", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.status === 200) {
      setShowAlert(true)
    }
  }
  const url = (did) => {
    return `http://69.130.147.123:8100/#!action=stream&udid=${did}&player=mse&ws=ws%3A%2F%2F69.130.147.123%3A8100%2F%3Faction%3Dproxy-adb%26remote%3Dtcp%253A8886%26udid%3D${did}`
  }

  return (
    <>
      <Navbar handleLogOut={handleLogOut} handleResetPorts={handleResetPorts} />
      {showAlert ? <Alert /> : null}
      <div className="relative grid w-3/4 m-auto mt-12 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Phone Name
              </th>
              <th scope="col" className="px-6 py-3">
                Device ID
              </th>
              <th scope="col" className="px-6 py-3">
                Port
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Airplane Fix
              </th>
              <th scope="col" className="px-6 py-3">
                View Remote
              </th> */}
            </tr>
          </thead>
          <tbody>
            {devices &&
              devices.map((device) => {
                return (
                  <tr
                    key={device.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {device.name_of_phone}
                    </th>
                    <td className="px-6 py-4">{device.device_id}</td>
                    <td className="w-1/4 px-6 py-4 ">
                      <div className="relative">
                        <input
                          ref={refsById[device.id]}
                          type="text"
                          className="block w-full p-4 pl-6 text-sm text-gray-900 border border-gray-300 rounded-lg placeholder:text-gray-600 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={device.port}
                        />
                        <button
                          type="submit"
                          onClick={() => handlePort(device)}
                          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 uppercase">{device.model}</td>
                    <td className="">
                      <Tooltip
                        content="Reset IP"
                        className="text-black bg-yellow-200"
                      >
                        <RefreshIcon
                          onClick={() => handleReset(device)}
                          className="w-8 h-16 ml-3 text-xl font-bold cursor-pointer text-sky-600 hover:text-sky-700 hover:underline"
                        />
                      </Tooltip>
                      <Tooltip
                        content="Airplane Fix"
                        className="text-black bg-yellow-200"
                      >
                        <FlightIcon
                          onClick={() => handleAirplaneFix(device)}
                          className="w-8 h-16 mx-5 text-xl font-bold text-yellow-600 cursor-pointer hover:text-yellow-700 hover:underline"
                        />
                      </Tooltip>

                      <Tooltip
                        content="View Device"
                        className="text-black bg-yellow-200"
                      >
                        <a
                          href={url(device.device_id)}
                          className="mr-3 font-medium text-black-600 hover:text-black dark:text-blue-500 hover:underline"
                          target="__blank"
                        >
                          <RemoveRedEyeIcon />
                        </a>
                      </Tooltip>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home
