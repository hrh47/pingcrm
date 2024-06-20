import client from "./axiosClient";
import _ from "lodash";

const contactApi = {
  async getContacts({ filters, page }) {
    const response = await client.get("/api/contacts", {
      params: {
        page,
        ..._.omitBy(filters, (value) => value === ""),
      },
    });
    return response.data;
  },
  async createContact(contact) {
    const response = await client.post("/api/contacts", contact);
    return response.data;
  },
  async getContact(id) {
    const response = await client.get(`/api/contacts/${id}`);
    return response.data;
  },
  async updateContact(id, contact) {
    const response = await client.put(`/api/contacts/${id}`, contact);
    return response.data;
  },
  async deleteContact(id) {
    const response = await client.delete(`/api/contacts/${id}`);
    return response.data;
  },
};

export default contactApi;
