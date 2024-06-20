import { useMutation, useQueryClient } from "@tanstack/react-query";
import organizationApi from "../api/organizationApi";

const useUpdateOrganization = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => organizationApi.updateOrganization(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["organizations", id] }),
  });
};

export default useUpdateOrganization;
