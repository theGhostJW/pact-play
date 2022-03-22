import axios from "axios"


type DogParams = {
  url: string,
  port: number
}

export const getMeDogs = (endpoint: DogParams) => {
  const
    url = endpoint.url,
    port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/dogs",
    headers: { Accept: "application/json" },
  })
}

export const getMeDog = (endpoint: DogParams) => {
  const
    url = endpoint.url,
    port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/dogs/1",
    headers: { Accept: "application/json" },
  })
}
