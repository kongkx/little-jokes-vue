import axios from "axios";
import store from "./store";

const instance = axios.create({
  // baseURL: 'http://localhost',
  // baseURL: 'http://172.20.10.4',
  headers: {
    accept: "application/json"
  }
});

const request = config => {
  const extraHeaders = {};
  const apiToken = store.getters.apiToken;
  if (apiToken) {
    extraHeaders.authorization = `Bearer ${apiToken}`;
  }
  const merged = {
    ...config,
    headers: {
      ...(config.headers || {}),
      ...extraHeaders
    }
  };
  if (process.env.NODE_ENV !== "production") {
    console.log(merged);
  }

  return instance.request(merged).then(res => res.data);
};

export const fetchLatestPost = async params => {
  return request({
    url: "/api/feed/latest",
    method: "GET",
    params
  });
};

export const fetchHottestPost = async params => {
  return request({
    url: "/api/feed/hottest",
    method: "GET",
    params
  });
};

export const fetchRandomPost = async params => {
  return request({
    url: "/api/feed/random",
    method: "GET",
    params
  });
};

export const getPost = async postId => {
  return request({
    url: `/api/posts/${postId}`,
    method: "GET"
  });
};

export const likePost = async postId => {
  return request({
    url: `/api/posts/${postId}/_like`,
    method: "POST"
  });
};

export const unlikePost = async postId => {
  return request({
    url: `/api/posts/${postId}/_unlike`,
    method: "POST"
  });
};

export const reportPost = async (postId, data) => {
  return request({
    url: `/api/posts/${postId}/_report`,
    method: "POST",
    data
  });
};

export const loginWithPassword = async data => {
  return request({
    url: "/api/auth/login/with_phone_password",
    method: "POST",
    data
  });
};

export const loginWithCode = async data => {
  return request({
    url: "/api/auth/login/with_phone_code",
    method: "POST",
    data
  });
};

export const sendLoginCode = async data => {
  return request({
    url: "/api/auth/login/send_phone_code",
    method: "POST",
    data
  });
};

export const sendRegisterCode = async data => {
  return request({
    url: "/api/auth/register/send_phone_code",
    method: "POST",
    data
  });
};

export const registerWithCode = async data => {
  return request({
    url: "/api/auth/register/with_phone_code",
    method: "POST",
    data
  });
};

export const fetchUserCollection = (userId, params) => {
  return request({
    url: `/api/users/${userId}/liked-posts`,
    method: "GET",
    params
  });
};

export const archiveLike = likeId => {
  return request({
    url: `api/likes/${likeId}/_archive`,
    method: "POST"
  });
};
export const unarchiveLike = likeId => {
  return request({
    url: `api/likes/${likeId}/_unarchive`,
    method: "POST"
  });
};
