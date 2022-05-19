import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (deleteReviewId) => {
    try {
      await mutate({ variables: { deleteReviewId } });
    } catch (error) {
      console.log("[useDeleteReview] Error:", error);
    }
  };

  return deleteReview;
};

export default useDeleteReview;
