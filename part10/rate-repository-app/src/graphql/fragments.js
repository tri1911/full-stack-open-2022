import { gql } from "@apollo/client";

export const REPOSITORY_BASE_FIELDS = gql`
  fragment repositoryBaseFields on Repository {
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    id
    url
  }
`;

export const USER_BASE_FIELDS = gql`
  fragment userBaseFields on User {
    id
    username
  }
`;

export const REVIEW_BASE_FIELDS = gql`
  fragment reviewBaseFields on Review {
    id
    text
    rating
    createdAt
    repositoryId
    user {
      id
      username
    }
  }
`;

export const PAGE_INFO_BASE_FIELDS = gql`
  fragment pageInfoBaseFields on PageInfo {
    startCursor
    endCursor
    hasNextPage
  }
`;
