import { gql } from "@apollo/client";
import {
  REPOSITORY_BASE_FIELDS,
  REVIEW_BASE_FIELDS,
  USER_BASE_FIELDS,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...repositoryBaseFields
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...repositoryBaseFields
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...reviewBaseFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
  ${REVIEW_BASE_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      ...userBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`;
