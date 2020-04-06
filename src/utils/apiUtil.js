const axios = require('axios');

const commonAxios = axios.create({
    baseURL: 'http://localhost:8080/'
});

commonAxios.interceptors.response.use(function(response){
    const {data} = response;
    if(data.code !== 0){
        throw new Error(data.message || 'Unknown error');
    }
    return data.data;
}, function(error){
    return Promise.reject(error);
});

export { commonAxios };