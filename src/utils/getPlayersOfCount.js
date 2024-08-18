import axios from "axios";
import { getRequest } from "./fetchUtils";

export default async function getPlayersOfCount(searchParam, count) {
  count = Math.min(count, 20);

  const playersData = await getRequest("players", {
    params: { search: `${searchParam}` },
  });

  return [...playersData.data.data.slice(0, count)];
}
