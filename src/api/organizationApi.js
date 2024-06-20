import client from "./axiosClient";
import _ from "lodash";

const organizationApi = {
  async getOrganizations({ filters, page }) {
    const response = await client.get("/api/organizations", {
      params: {
        page,
        ..._.omitBy(filters, (value) => value === ""),
      },
    });
    return response.data;
  },
  async createOrganization(organization) {
    const response = await client.post("/api/organizations", organization);
    return response.data;
  },
  async getOrganization(id) {
    const response = await client.get(`/api/organizations/${id}`);
    return response.data;
  },
  async updateOrganization(id, organization) {
    const response = await client.put(`/api/organizations/${id}`, organization);
    return response.data;
  },
  async deleteOrganization(id) {
    const response = await client.delete(`/api/organizations/${id}`);
    return response.data;
  },
};

export default organizationApi;
