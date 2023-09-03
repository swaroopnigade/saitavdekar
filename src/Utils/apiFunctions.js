import axios from 'axios';
export const post = async (url, data) => {
    try{
        const token = localStorage.getItem("token")
        const headers = { 'Authorization': `Bearer ${token}` }; 
        const response = await axios.post(url, data, {headers});
        const responseData = response.data;
        return responseData;
    }catch(err){
        const data = {message:err.response ? err.response.data : err.message, data:null, status:500, error:true};
        return data;
    }
}

export const get = async (url) => {
    try{
        const token = localStorage.getItem("token")
        const headers = { 'Authorization': `Bearer ${token}` }; 
        const response = await axios.get(url, {headers});
        const responseData = response.data;
        return responseData;
    }catch(err){
        const data = {message:err.response ? err.response.data : err.message, data:null, status:err.response ? err.response.status : 500, error:true};
        return data;
    }
}

export const put = async (url, data) => {
    
    try{
        const token = localStorage.getItem("token")
        const headers = { 'Authorization': `Bearer ${token}` }; 
        const response = await axios.put(url, data, {headers});
        const responseData = response.data;
        console.log("in put responseData === ", responseData)
        return responseData;
    }catch(err){
        console.log("in put catch === ", err)
        if(err.response){
            const data = {message:err.response.data.message || "Interval server error", data:null, status:500, error:true};
            console.log("in put catch 111=== ", data)
            return data;
        }else{
            const data = {message:err.response ? err.response.data : err.message, data:null, status:500, error:true};
            console.log("in put catch 2222=== ", data)
            return data;
        }
        
    }
}

