import { useQuery } from "@tanstack/react-query";
import userApi from "../api/userApi";

function useUser(id) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userApi.getUser(id),
    staleTime: 5 * 60 * 1000,
  });
}

export default useUser;
