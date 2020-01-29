import axios from "axios";

const api_url = "https://melt-chat-backend.herokuapp.com";

export class backend{
    static async get_messages(){
        return axios.get(`${api_url}/message/all`);
    }
    
    static async post_message(data:any){
        return axios.post(`${api_url}/message`, data);
    }
    
    static async create_user(data:any){
        return axios.post(`${api_url}/user`, {"nickname": data});
    }
    
    static async validate_user(data:any){
        return axios.post(`${api_url}/auth`, {"nickname": data});
    }
};
