import request from "./base";
import { auth, profile, orders } from "./services";

request.auth = auth;
request.profile = profile;
request.orders = orders;

export default request;