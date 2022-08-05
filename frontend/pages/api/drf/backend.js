/* eslint-disable import/no-anonymous-default-export */
const SERVERSIDE_API_HOST = process.env.NEXT_PUBLIC_SERVERSIDE_API_HOST
const ENDPOINT = `http://${SERVERSIDE_API_HOST}/api/device/`

export default async function (req, res) {
  const { command, device } = req.body

  if (command === "reset_ip") {
    const d_name = device["name_of_phone"]
    console.log(d_name)
    const complete_url = `${ENDPOINT}?reset_port_device=${d_name}`
    await fetch(complete_url)
    return res.status(200).json({ message: `Successfuly reset ip.` })
  }
  let new_port = ""
  if (command === "change_port") {
    new_port = req.body.new_port
  }

  try {
    if (command === "reset_ip") {
      await fetch(`${ENDPOINT}?reset_port_device=${device["name"]}`)
    }

    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ command, device, new_port }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.log(err)
    res.status(400)
  }

  return res.status(200).json({ message: `Successfuly ${command}.` })
}
