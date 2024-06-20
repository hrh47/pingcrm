import { useQuery } from "@tanstack/react-query";
import organizationApi from "../api/organizationApi";

function useOrganizations({ filters, page }) {
  return useQuery({
    queryKey: ["organizations", { filters, page }],
    queryFn: () => organizationApi.getOrganizations({ filters, page }),
    staleTime: 5 * 60 * 1000,
  });
}

export default useOrganizations;
