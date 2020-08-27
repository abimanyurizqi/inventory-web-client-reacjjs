const axios = require('axios');

const commonAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

// commonAxios.interceptors.request.use(config => {
//     config.headers['Authorization'] = "Bearer " + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6IkFETUlOLFVTRVIiLCJpYXQiOjE1ODcxOTY0NTMsImV4cCI6MTU5MDc5NjQ1M30.xE_opKRcRdO5Dmsgmnq7hyZdQPsPRd_TlmlZ3Z7pZuQ';
//     return config;
// }, error => {
//     return Promise.reject(error)
// });

commonAxios.interceptors.response.use(function (response) {
    const { data } = response;
    if (data.code !== 0) {
        const error = new Error(data.message || 'Unknown error');
        error.data = data.data;
        throw error;
    }
    return data.data;
}, function (error) {
    return Promise.reject(error);
});

export { commonAxios };