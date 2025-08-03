import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export const getAssignedQueries = (employeeId: string) =>
  API.get(`/employee/employeeQuery/${employeeId}`);

export const getBooks = () => API.get(`/books`);

export const getBookById = (id: string) => API.get(`/books/${id}`);

export const getUserProfile = () => {
  const token = localStorage.getItem("token");
  return API.get(`/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = (data: { username: string; email: string; password: string }) =>
  API.post('/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post('/login', data);

export const createComment = (data: { bookId: string; rating: number; comment: string }) => {
  const token = localStorage.getItem("token");
  return API.post('/comments', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCommentsByBook = (bookId: string, params?: { page?: number; limit?: number; sort?: string }) => {
  return API.get(`/comments/book/${bookId}`, { params });
};

