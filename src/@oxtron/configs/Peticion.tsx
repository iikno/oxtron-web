import axios from "axios";
import { $base_uri } from "./Env";

export const Peticion = axios.create({
    baseURL: $base_uri
})