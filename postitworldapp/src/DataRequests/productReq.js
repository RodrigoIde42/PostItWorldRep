import {gql} from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query ListProducts{
    products{
        nodes{
            productId
            productImage
            productName
            productCat
            productDesc
            productRating
            productNumReviews
            productPrice
            productDiscountprice 
        }
    }
  }
`;