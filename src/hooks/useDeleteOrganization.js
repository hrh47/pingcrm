import { useMutation, useQueryClient } from "@tanstack/react-query";
import organizationApi from "../api/organizationApi";

const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: organizationApi.deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "organizations" });
    },
  });
};

export default useDeleteOrganization;
