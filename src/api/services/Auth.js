import request from "../base";

const endpoints = {
	signIn: "/login",
};

export const signIn = async (payload) => {
	const res = await request.post(endpoints.signIn, payload);
	return res.data;
};
