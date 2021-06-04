import axios from "axios"
import storage from '../lib/types/storage';
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/",
  responseType: "json",
});

axiosInstance.interceptors.request.use((config)=>{
  if (config.url) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: 'Bearer ' + storage?.token,
      }
    }
  }
  return config
})
export const reqLogin = (query:{username:string,password:string})=>{
  axiosInstance.post('login',query).then(res=>{
    console.log(res);
  })
}