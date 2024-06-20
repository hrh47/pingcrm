import { useQuery } from "@tanstack/react-query";
import contactApi from "../api/contactApi";

function useContact(id) {
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: () => contactApi.getContact(id),
    staleTime: 5 * 60 * 1000,
  });
}

export default useContact;
