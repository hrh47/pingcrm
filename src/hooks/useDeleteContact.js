import { useMutation, useQueryClient } from "@tanstack/react-query";
import contactApi from "../api/contactApi";

const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactApi.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "contacts" });
    },
  });
};

export default useDeleteContact;
