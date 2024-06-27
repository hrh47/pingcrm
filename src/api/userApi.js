import client from "./axiosClient";
import _ from "lodash";

const userApi = {
  async getUsers({ filters }) {
    const response = await client.get("/api/users", {
      params: {
        ..._.omitBy(filters, (value) => value === ""),
      },
    });
    return response.data;
  },
  async createUser(user) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(_.omit(user, ["photo"])));
    formData.append("photo", user.photo);
    const response = await client.post("/api/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  async getUser(id) {
    const response = await client.get(`/api/users/${id}`);
    return response.data;
  },
  async updateUser(id, user) {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("data", JSON.stringify(_.omit(user, ["photo"])));
    formData.append("photo", user.photo);
    const response = await client.post(`/api/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  async deleteUser(id) {
    const response = await client.delete(`/api/users/${id}`);
    return response.data;
  },
};

export default userApi;
