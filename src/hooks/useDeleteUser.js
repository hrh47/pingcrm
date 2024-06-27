import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../api/userApi";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "users" });
    },
  });
};

export default useDeleteUser;
