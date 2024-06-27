import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../api/userApi";

const useUpdateUser = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => userApi.updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users", id] }),
  });
};

export default useUpdateUser;
