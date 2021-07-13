import request from "../base";

const endpoints = {
	profile: "/profile",
	users: "/users",
};

export const getProfile = async () => {
	const res = await request.get(endpoints.profile);
	return res.data;
};
export const getUser = async () => {
	const res = await request.get(endpoints.users);
	return res.data;
};
export const postUser = async () => {
	const res = await request.post(endpoints.users);
	return res.data;
};