import { useQuery } from "@tanstack/react-query";
import userApi from "../api/userApi";

function useUsers({ filters }) {
  return useQuery({
    queryKey: ["users", { filters }],
    queryFn: () => userApi.getUsers({ filters }),
    staleTime: 5 * 60 * 1000,
  });
}

export default useUsers;
