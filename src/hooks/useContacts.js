import { useQuery } from "@tanstack/react-query";
import contactApi from "../api/contactApi";

function useContacts(params) {
  return useQuery({
    queryKey: ["contacts", params],
    queryFn: () => contactApi.getContacts(params),
    staleTime: 5 * 60 * 1000,
  });
}

export default useContacts;
