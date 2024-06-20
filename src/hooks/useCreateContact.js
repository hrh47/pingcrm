import { useMutation, useQueryClient } from "@tanstack/react-query";
import contactApi from "../api/contactApi";

const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactApi.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "contacts" });
    },
  });
};

export default useCreateContact;
