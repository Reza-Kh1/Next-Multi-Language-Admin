import axios from "axios";
const getProducts = async (query: string) => {
  const url = new URLSearchParams(query);
  const { data } = await axios.get(`products?${url}`);
  return data;
};
const getAllUsers = async (query: string) => {
  const url = new URLSearchParams(query);
  const { data } = await axios.get(`getusers?${url}`);
  return data;
};
const getSingleProduct = async (slug?: string) => {
  const { data } = await axios.get(`products/${slug}`);
  return data;
};
const getProjects = async (query: string) => {
  const url = new URLSearchParams(query);
  const { data } = await axios.get(`projects?${url}`);
  return data;
};
const getSingleProject = async (slug?: string) => {
  const { data } = await axios.get(`projects/${slug}`);
  return data;
};
const getBlogs = async (query: string) => {
  const url = new URLSearchParams(query);
  const { data } = await axios.get(`blogs?${url}`);
  return data;
};
const getSingleBlog = async (slug?: string) => {
  const { data } = await axios.get(`blogs/${slug}`);
  return data;
};
const getComments = async (query: string) => {
  const url = new URLSearchParams(query);
  const { data } = await axios.get(`comments?${url}`);
  return data;
};
const getAllTransaction =async (query: string) => {
  const url = new URLSearchParams(query);
  const { data } = await axios.get(`transactions?${url}`);
  return data;
};
export {
  getProducts,
  getSingleProduct,
  getProjects,
  getSingleProject,
  getBlogs,
  getSingleBlog,
  getAllUsers,
  getComments,getAllTransaction
};
