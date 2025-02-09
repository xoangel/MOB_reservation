import axios from "axios";
import type {AxiosRequestConfig, AxiosResponse} from 'axios';

class ApiInterface{


    public async post(endpoint: string, payload: any, params?: AxiosRequestConfig<any>): Promise<AxiosResponse<any>> {
        try{
            const response =  await axios.post(import.meta.env.VITE_SERVER + endpoint, payload, params);
            return response;
        } catch(e){
            console.error(e);
            throw e;
        }   
    }

    public async get(endpoint: string, payload?: any): Promise<AxiosResponse<any>> {
        try{
            const response =  await axios.get(import.meta.env.VITE_SERVER + endpoint, payload);
            return response;
        } catch(e){
            console.error(e);
            throw e;
        }      
    }

    public async patch(endpoint: string, payload: any, params?: AxiosRequestConfig<any>): Promise<AxiosResponse<any>> {
        try{
            const response =  await axios.patch(import.meta.env.VITE_SERVER + endpoint, payload, params);
            return response;
        } catch(e){
            console.error(e);
            throw e;
        }       
    }

    public async delete(endpoint: string): Promise<AxiosResponse<any>> {
        try{
            const response =  await axios.delete(import.meta.env.VITE_SERVER + endpoint);
            return response;
        } catch(e){
            console.error(e);
            throw e;
        }
    }
}

const ApiService = new ApiInterface();
export default ApiService;
