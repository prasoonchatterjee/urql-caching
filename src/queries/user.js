import { gql } from "urql";

export const GetUser = gql`
  query {
  post(id: 1) {
    id
    title
    body
  }
}
`
