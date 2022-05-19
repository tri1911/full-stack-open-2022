import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const review = { ownerName, repositoryName, rating, text };
    const {
      data: { createReview: createdReview },
    } = await mutate({ variables: { review } });
    // console.log("[useReview] created review:", createdReview);
    return createdReview;
  };

  return [createReview, result];
};

export default useReview;
