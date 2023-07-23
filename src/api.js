//在main.js写过了，可以移到这来
//import { getRequest,postJsonRequest,getNoAuthRequest,postFlowRequest } from '@/libs/axios';
import axios from 'axios';
// 设置默认的请求地址
axios.defaults.baseURL = 'http://127.0.0.1:8080'; 

// 删除购物车商品
export const deleteCartItem = (cartId) => {
  return axios.delete('/shoppingcart/delete',{cartId});// return getNoAuthRequest('/shoppingcart/delete', params)
};

// 修改购物车商品数量
export const updateCartItemQuantity = (cartId, quantity) => {
  return axios.put('/shoppingcart/update', {cartId,quantity });
};
// 批量购买
export const batchPurchase = (cartIds) => {
  return axios.post('/shoppingcart/buy', { cartIds });//return getNoAuthRequest('/shoppingcart/buy', params)
};

// 批量删除购物车商品
export const batchDeleteCartItems = (cartIds) => {
  return axios.delete('/shoppingcart/delete', {
    data: { cartIds },
  });
};
// 查询购物车信息
export const getShoppingCart = (userId, page, pageSize) => {
  return axios.get('/shoppingcart', {
    params: { userId, page, pageSize }, //return getNoAuthRequest('/shoppingcart', params)
  });
};
// 分页查询用户
export const getUsers = (name, status, page, pageSize) => {
    return axios.get('/admin/user', {
      params: { name, status, page, pageSize },
    });
  };
  
  // 删除用户
  export const deleteUsers = (ids) => {
    return axios.delete(`/admin/user/${ids}`);
  };
  
  // 增加用户
  export const addUser = (user) => {
    return axios.post('/admin/add', user);
  };
  
  // 修改用户信息
  export const updateUser = (userId, user) => {
    return axios.put(`/admin/update/${userId}`, user);
  };
  
  // 查询历史订单
  export const getOrders = () => {
    return axios.get('/admin/orders');
  };
