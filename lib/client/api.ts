import wretch from "wretch";
import { BASE_URL } from "../server/constants";

export const api = wretch(BASE_URL);
