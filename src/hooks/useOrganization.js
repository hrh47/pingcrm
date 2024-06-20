import { useQuery } from "@tanstack/react-query";
import organizationApi from "../api/organizationApi";

function useOrganization(id) {
  return useQuery({
    queryKey: ["organizations", id],
    queryFn: () => organizationApi.getOrganization(id),
    staleTime: 5 * 60 * 1000,
  });
}

export default useOrganization;
