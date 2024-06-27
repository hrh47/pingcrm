import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../api/userApi";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "users" });
    },
  });
};

export default useCreateUser;
