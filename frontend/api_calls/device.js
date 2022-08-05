const api_host = process.env.NEXT_PUBLIC_SERVERSIDE_API_HOST

export const getDevices = async (endpoint = "", query_params = "") => {
  try {
    const url = `http://${api_host}/api/${endpoint}/?${query_params}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    if (data?.error) {
      console.error("Result api error", data.error)
      return []
    } else {
      return data
    }
  } catch (error) {
    console.error("Something went wrong with the result api", error)
    return []
  }
}
