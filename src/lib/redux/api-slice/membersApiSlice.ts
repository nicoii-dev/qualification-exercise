import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// GraphQL API endpoint
const BASE_URL = "https://report.development.opexa.io/graphql";

// Define the API slice
export const membersApiSlice = createApi({
  reducerPath: "members",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {}) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjakp0ZFdQaGhkUHlYU25SdSIsInJvbGUiOiJBRE1JTiIsImp0aSI6IjJjODBiMDI1YzY4MDZjNTBhMzQ1NzVjNyIsImlwQWRkcmVzcyI6IjE0My40NC4xOTIuMTQ3IiwibG9jYXRpb24iOiJDYWdheWFuIGRlIE9ybywgUGhpbGlwcGluZXMiLCJwbGF0Zm9ybSI6IjEydXd1UkNjWXAxY1dpWHpQWSIsImlhcCI6IjIwMjQtMTItMjNUMDQ6MjA6MTIuOTc4KzAwOjAwIiwidGVzdFBhc3MiOnRydWUsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MzQ5Mjc2NDMsImV4cCI6MTc2NjQ2MzY0M30.3bOWl4q2k4IzLJTpmTB2zlgvtxQAWy8fq9f2cWSIZD4";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GraphQL Query (Fetching members)
    getMembers: builder.query({
      query: ({ first, after, filter }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
                query ($first: Int, $after: Cursor, $filter: MemberFilterInput) {
                    members(first: $first, after: $after, filter: $filter) {
                    edges {
                        node {
                        id
                        ... on Member {
                            name
                            verificationStatus
                            emailAddress
                            mobileNumber
                            domain
                            dateTimeCreated
                            dateTimeLastActive
                            status
                                wallet {
                                    id
                                    currency
                                    balance
                                }
                            }
                        }
                        cursor
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    totalCount
                    }
                }
            `,
          variables: { first, after, filter },
          fetchPolicy: "network-only" // Forces new data on every fetch
        },
      }),
    }),
    getMembersByName: builder.query({
      query: ({ search }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
              query MembersByName($search: String!, $first: Int) {
                membersByName(search: $search, first: $first) {
                  name
                        verificationStatus
                        emailAddress
                        mobileNumber
                        domain
                        dateTimeCreated
                        dateTimeLastActive
                        status
                        wallet {
                          id
                          currency
                          balance
                        }
                }
              }
            `,
          variables: { search },
        },
      }),
    }),
    getMembersByEmail: builder.query({
      query: ({ search }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
               query MembersByEmailAddress($search: String!, $first: Int) {
                membersByEmailAddress(search: $search, first: $first) {
                  name
                    verificationStatus
                    emailAddress
                    mobileNumber
                    domain
                    dateTimeCreated
                    dateTimeLastActive
                    status
                    wallet {
                      id
                      currency
                      balance
                    }
                }
              }
            `,
          variables: { search },
        },
      }),
    }),
    getMembersByMobileNumber: builder.query({
      query: ({ search }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
              query MembersByMobileNumber($search: String!, $first: Int) {
                  membersByMobileNumber(search: $search, first: $first) {
                      name
                        verificationStatus
                        emailAddress
                        mobileNumber
                        domain
                        dateTimeCreated
                        dateTimeLastActive
                        status
                        wallet {
                          id
                          currency
                          balance
                        } 
                }
              }
            `,
          variables: { search },
        },
      }),
    }),
    getMembersByDomain: builder.query({
      query: ({ search }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
              query MembersByDomain($search: String!, $first: Int) {
                membersByDomain(search: $search, first: $first) {
                          name
                        verificationStatus
                        emailAddress
                        mobileNumber
                        domain
                        dateTimeCreated
                        dateTimeLastActive
                        status
                        wallet {
                          id
                          currency
                          balance
                        } 
                }
              }
            `,
          variables: { search },
        },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetMembersQuery,
  useLazyGetMembersQuery,
  useGetMembersByEmailQuery,
  useLazyGetMembersByEmailQuery,
  useGetMembersByNameQuery,
  useLazyGetMembersByNameQuery,
  useGetMembersByMobileNumberQuery,
  useLazyGetMembersByMobileNumberQuery,
  useGetMembersByDomainQuery,
  useLazyGetMembersByDomainQuery
} = membersApiSlice;
