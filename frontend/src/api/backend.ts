import axios from "axios";

const api_url = "http://localhost:8090";

export class backend{
    static async get_messages(){
        return axios.get(`${api_url}/message/all`);
    }
    
    static async post_message(data:any){
        return axios.post(`${api_url}/message`, data);
    }
    
    static async create_user(data:any){
        return axios.post(`${api_url}/user`, data);
    }
    
    static async validate_user(data:any){
        return axios.post(`${api_url}/auth`, data);
    }
};
