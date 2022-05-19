import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, fetchMore, loading, ...result } = useQuery(
    GET_SINGLE_REPOSITORY,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMoreReviews = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMoreReviews: handleFetchMoreReviews,
    loading,
    ...result,
  };
};

export default useRepository;
