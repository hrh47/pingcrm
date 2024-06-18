import { create } from "zustand";

const useFlashMessage = create((set) => ({
  success: null,
  error: null,
  flash(type, message) {
    if (type === "success") {
      set(() => ({ success: message }));
    } else if (type === "error") {
      set(() => ({ error: message }));
    }
  },
  clear(type) {
    if (type === "success") {
      set(() => ({ success: null }));
    } else if (type === "error") {
      set(() => ({ error: null }));
    }
  },
}));

export default useFlashMessage;
