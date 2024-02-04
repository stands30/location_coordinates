    import axios from 'axios';


    const api = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT
    });


    api.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers['Access-Control-Allow-Origin'] = "*";
        config.headers['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
        config.headers['Content-Type'] = "application/json;charset=UTF-8";
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
    axios.interceptors.response.use((response) => {
        return response
      }, function (error) {
        return Promise.reject(error);
      });

    export const getCoordinates = ()=>{
        return api.get('/');
    }

    export const saveCoordinates = (data)=>{
        return api.post('/', data);
    }
    
    export const deleteCoordinate = (_id)=>{
        return api.delete(`/${_id}`);
    }

    
    export const updateCoordinateById = (_id, data)=>{
        return api.patch(`/${_id}`, data);
    }

    export const getCoordinateById = (_id)=>{
        return api.get(`/${_id}`);
    }
    export default api;