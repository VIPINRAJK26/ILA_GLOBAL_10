import axiosInstance from "../../../api/axiosInstance";


const getVisa = async () => {
    const response = await axiosInstance.get('/visas');
    return response.data;
}

export default getVisa;