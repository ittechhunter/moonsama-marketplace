import { gql } from 'graphql-request';
import { META } from './common';

export const QUERY_USER_ERC721 = (account: string) => gql`
  query getUserTokens {
    ${META}
    owners(where: {id: "${account.toLowerCase()}"}) {
      id,
      ownedTokens {
        id,
        contract {
          id
        }
      }
    }
  }
`;
