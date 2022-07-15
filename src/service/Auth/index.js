import axios from "axios";

export const userLoginApi = async (data) => {
    return await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/v1/users/login',
        data: data
    }).then((response) => response.data);
}

export const userRegisterApi = async (data) => {
    return await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/v1/users/register',
        data: data
    }).then((response) => response.data);
}