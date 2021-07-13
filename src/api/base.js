import { create } from "axios";
import { api } from "constans";

const request = create({
	baseURL: api
});
const token = localStorage.getItem("token");
if(token){
	request.defaults.headers.common['x-access-token'] = token;
}else{
	request.defaults.headers.common['x-access-token'] = null;

}

export default request;
