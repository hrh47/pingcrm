import { useMutation, useQueryClient } from "@tanstack/react-query";
import contactApi from "../api/contactApi";

const useUpdateContact = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => contactApi.updateContact(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["contacts", id] }),
  });
};

export default useUpdateContact;
