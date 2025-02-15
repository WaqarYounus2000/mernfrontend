import axios from "axios"



const postDataByAxios = async (API, dataSend) => {
    try {
        const response = await axios.post(API, dataSend, { withCredentials: true, credentials: "include" });
        return response
    } catch (error) {
        return error.response
    }
}
const GetDataByAxios = async (API) => {
    try {
        console.log(API)
        const response = await axios.get(API, { withCredentials: true, credentials: "include" });
        return response
    } catch (error) {
        return error.response
    }
}
const DeleteDataByAxios = async (API) => {
    try {
        const response = await axios.delete(API, { withCredentials: true, credentials: "include" });
        return response
    } catch (error) {
        return error.response
    }
}



const putDataByAxios = async (API, dataSend) => {
    try {
        const response = await axios.put(API, dataSend, { withCredentials: true, credentials: "include" });
        return response
    } catch (error) {
        return error.response
    }
}





export { postDataByAxios,GetDataByAxios,DeleteDataByAxios,putDataByAxios }