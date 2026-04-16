import React from "react";
import createParcel from "@/utility/createParcel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const CreateParcelModal = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createParcel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parcels", "active"] });
    }, // Fires when the request succeeds; often used to invalidate queries so the UI refreshes with new data.
    onError: () => {}, //Fires if the mutation fails.
    onMutate: () => {}, //Fires before the mutation starts; ideal for optimistic updates.
    onSettled: () => {}, //Fires after the mutation completes, regardless of the outcome.
    // State Tracking: Automatically provides boolean flags like
    //  isPending (currently running), isError, and isSuccess to handle UI states.
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      CreateParcelModal
    </div>
  );
};

export default CreateParcelModal;

/*
const mutation = useMutation({
  mutationFn: createParcel,
  onSuccess: () => {
    // This tells React Query that the 'active parcels' list is now "old"
    // It will automatically trigger a re-fetch in the background
    queryClient.invalidateQueries({ queryKey: ["parcels", "active"] });

    // 1. Show Success Toast
    // 2. Close the Modal/Form
    // 3. Reset Form
  },
  onError: (error) => {
    // Show Failure Toast with error.message
  },
});

*/
