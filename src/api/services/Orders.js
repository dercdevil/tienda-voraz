import request from "../base";

const endpoints = {
  orders: "/orders",
};

export const getOrders = async () => {
  const res = await request.get(endpoints.orders, {
    params: {
      not_paginate: true,
      is_seller: true,
    },
  });
  return res.data;
};
