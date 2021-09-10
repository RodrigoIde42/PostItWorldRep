import React, { useState } from 'react';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import Rating from './rating';
import CheckOut from './checkOut';

Modal.setAppElement('#root');

export default function Product(props){

    const [showModal, setModalOpen] = useState(false); 
    const [showCheckOut, setcheckOutShow] = useState(false)

    function switchModalState(){
        setModalOpen(prev => !prev);
    }

    function viewCheckOut() {
        setcheckOutShow(true);
    }

    const productId = props.product.productId;
    const {product} = props;
    return (
        <>
            <div id={product.productId} className="card">
                <img className="medium" src={product.productImage} alt={product.productName} onClick={switchModalState}/>
                <div className="card-body">
                    <h2 onClick={switchModalState}>{product.productName}</h2>
                    <Rating rating={product.productRating} numReviews={product.productNumReviews}></Rating>
                    {product.productDiscountprice === null ?
                        <div className="price">
                            <p>${product.productPrice}</p>
                        </div> :
                        <div className="price">
                            <p className="discount"> ${product.productPrice} </p> <p> ${product.productDiscountprice} </p>
                        </div>
                    }
                </div>
            </div>
            <Modal isOpen={showModal}>
                <Zoom>
                    <button className="close-modal" onClick={switchModalState}>X</button>
                    <div className="product-details">
                        <img src={product.productImage} alt={product.productName}/>
                        <div className="product-desc">
                            <p> <strong> {product.productName} </strong> </p>
                            <p> {product.description} </p>
                            {product.productDiscountprice === null ?
                                <div className="price">
                                    <p>${product.productPrice}</p>
                                    <button className="reserve-item" onClick={viewCheckOut}>Reserve this item</button>
                                </div> : 
                                <div className="price">
                                    <p> ${product.productDiscountprice} </p>
                                    <button className="reserve-item" onClick={viewCheckOut}>Reserve this item</button>
                                </div>
                            }
                        {showCheckOut ?
                            <CheckOut productId={productId} switchModalState={switchModalState} setcheckOutShow={setcheckOutShow} />
                            :
                            null
                        }
                        </div>
                    </div>
                </Zoom>
            </Modal>
        </>
    );
}