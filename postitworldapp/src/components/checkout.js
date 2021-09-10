import React, { useState } from 'react';
import { useMutation, gql} from '@apollo/client';
import { CREATE_USER } from '../DataRequests/userReq';
import InputMask from 'react-input-mask';
import Zoom from 'react-reveal/Zoom';


const BUY_PRODUCT = gql `
mutation buyProduct($userId: Int!, $productId: Int!){
    createUserProduct(input: {userProduct: {userId: $userId, productId: $productId}}){
      userProduct{
        purchaseId
        userId
        productId
      }
    }
}
`

export default function CheckOut(props){

    const setcheckOutShow = props.setcheckOutShow;
    const productId = props.productId;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");

    const [buyProduct] = useMutation(BUY_PRODUCT);
    const [createUser, {loading, error}] = useMutation(CREATE_USER, {
        onCompleted({createUser}){
            buyProduct({
                variables: {
                    userId: createUser.user.userId,
                    productId: productId
                }
            })
            props.switchModalState();
            alert("Your order has been placed!!")
        }
    });

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Couldn't submit :c</p>;

    return(
        <div className="checkOut">
            <Zoom>
                <form onSubmit={
                    e => {e.preventDefault(); 
                            createUser({
                                variables: {
                                    userName: name,
                                    userEmail: email,
                                    userAddress: address,
                                    userCity: city,
                                    userZipCode: zipCode,
                                    userPhone: phone
                                },
                            });
                            setcheckOutShow(false);
                        }
                }>
                    <table>
                        <tbody>
                            <td><input type="text" placeholder="Enter your name here!" onChange={e => setName(e.target.value)} value={name} required /></td>
                            <td><input type="email" placeholder="Enter your email here!" onChange={e => setEmail(e.target.value)} value={email} required /></td>
                            <tr></tr>
                            <td><input type="text" placeholder="Enter your address here!" onChange={e => setAddress(e.target.value)} value={address} required /></td>
                            <td><input type="text" placeholder="Enter your city name here!" onChange={e => setCity(e.target.value)} value={city} required /></td>
                            <tr></tr>
                            <td><InputMask mask="99999-999" type="text" placeholder="Enter your ZipCode here!" onChange={e => setZipCode(e.target.value)} value={zipCode} required /></td>
                            <td><InputMask mask="(99) 99999-9999" type="text" placeholder="Enter your phone number here!" onChange={e => setPhone(e.target.value)} value={phone} required /></td>
                            <tr></tr>
                            <td colSpan="2"><input type="submit" value="Submit"/></td>
                        </tbody>
                    </table>
                </form>
            </Zoom>
        </div>
    )
}