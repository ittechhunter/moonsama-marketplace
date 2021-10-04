import { gql } from 'graphql-request';
import { META } from './common';

export const QUERY_USER_ERC1155 = (account: string) => gql`
  query getUserTokens {
    ${META}
    tokenOwners(where: {owner: "${account.toLowerCase()}"}) {
      id,
      balance
      token {
        id
        contract {
          id
        }
      }
    }
  }
`;
