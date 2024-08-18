import axios from "axios";

export async function getRequest(path, options) {
  return await axios.get(
    "https://thingproxy.freeboard.io/fetch/" +
      "https://api.balldontlie.io/v1/" +
      path,
    {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: "1e10ea58-15bf-45b1-8338-5bafca9b7e13",
      },
    },
  );
}
