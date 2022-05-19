import { gql } from "@apollo/client";
import {
  PAGE_INFO_BASE_FIELDS,
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
        ...pageInfoBaseFields
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
  ${PAGE_INFO_BASE_FIELDS}
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
          ...pageInfoBaseFields
        }
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
  ${REVIEW_BASE_FIELDS}
  ${PAGE_INFO_BASE_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      ...userBaseFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewBaseFields
          }
          cursor
        }
        pageInfo {
          ...pageInfoBaseFields
        }
      }
    }
  }

  ${USER_BASE_FIELDS}
  ${REVIEW_BASE_FIELDS}
  ${PAGE_INFO_BASE_FIELDS}
`;
