import {gql} from 'graphql-tag';

export const CREATE_USER = gql`
    mutation createUser(
        $userName: String!, 
        $userEmail: String!, 
        $userAddress: String!, 
        $userCity: String!, 
        $userZipCode: String!, 
        $userPhone: String!) {
    createUser(input: {
        user: {
            userName: $userName, 
            userEmail: $userEmail, 
            userAddress: $userAddress, 
            userCity: $userCity, 
            userZipCode: $userZipCode, 
            userPhone: $userPhone
        }
    }) {
      user {
        userId
        userName
        userEmail
        userAddress
        userCity
        userZipCode
        userPhone
      }
    }
  }
`