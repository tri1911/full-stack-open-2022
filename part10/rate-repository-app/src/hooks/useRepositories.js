import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

// TODO: use useQuery to fetch data from GraphQL

const useRepositories = ({ orderBy, orderDirection }) => {
  const [repositories, setRepositories] = useState();
  const apolloClient = useApolloClient();

  apolloClient
    .query({
      query: GET_REPOSITORIES,
      variables: { orderBy, orderDirection },
    })
    .then(({ data }) => {
      setRepositories(data.repositories);
    });

  return { repositories };
};

export default useRepositories;
