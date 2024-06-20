import { useMutation, useQueryClient } from "@tanstack/react-query";
import organizationApi from "../api/organizationApi";

const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: organizationApi.createOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "organizations" });
    },
  });
};

export default useCreateOrganization;
