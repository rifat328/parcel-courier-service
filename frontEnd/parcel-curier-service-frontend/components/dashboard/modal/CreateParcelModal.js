import React from "react";
import createParcel from "@/utility/createParcel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUser } from "@/context/DashboardUserContext";
const CreateParcelModal = () => {
  const queryClient = useQueryClient();
  const { toggleCreateParcelModal } = useUser(); //take back from global context

  const mutation = useMutation({
    mutationFn: createParcel,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["parcels", "active"] }); // invalidate query
      toast.success(data.message || "Parcel created successfully! 🎉"); // show the toast
      toggleCreateParcelModal(); // then toggle the modal
    }, // Fires when the request succeeds; often used to invalidate queries so the UI refreshes with new data.
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Server connection failed";
      toast.error(errorMessage, { position: "top-center" });
    }, //Fires if the mutation fails.

    /* onMutate: () => {}, Fires before the mutation starts; ideal for optimistic updates.
    onSettled: () => {}, Fires after the mutation completes, regardless of the outcome.
    */
    // State Tracking: Automatically provides boolean flags like
    //  isPending (currently running), isError, and isSuccess to handle UI states.
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      {/* click outside to close */}
      <div className="absolute inset-0" on onClick={toggleCreateParcelModal} />

      <div className="relative bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Create New Parcel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Example Input */}
          <div>
            <label className="block text-xs text-gray-400 mb-1 ml-1">
              Parcel Name
            </label>
            <input
              name="name"
              required
              className="w-full bg-black border border-white/5 rounded-xl p-3 text-white focus:ring-2 focus:ring-[#D94E4E] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-[#D94E4E] hover:bg-[#b53d3d] text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Processing..." : "Confirm Creation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateParcelModal;
