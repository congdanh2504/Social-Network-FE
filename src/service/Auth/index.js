import axios from "axios";
import { BASE_URL } from "../common";

export const userLoginApi = async (data) => {
    return await axios({
        method: 'POST',
        url: `${BASE_URL}users/login`,
        data: data
    }).then((response) => response.data);
}

export const userRegisterApi = async (data) => {
    return await axios({
        method: 'POST',
        url: `${BASE_URL}users/register`,
        data: data
    }).then((response) => response.data);
}