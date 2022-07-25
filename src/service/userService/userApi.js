import axios from "axios";
import { getAccessToken } from "../common";

export const getProfile = async () => {
    return await axios({
        method: 'GET',
        url: 'http://localhost:8080/api/v1/users/profile',
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    }).then((response) => response.data);
}