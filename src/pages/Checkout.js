// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useState, useEffect, useContext} from 'react'
import { Grid, Form, Radio, Input, Label } from 'semantic-ui-react'
import {Analytics, API, } from 'aws-amplify';

import AppContext from '../context/AppContext'

import InitState from './InitState'
import CheckoutBanner from '../components/CheckoutBanner'
import CheckoutSummary from '../components/CheckoutSummary'
import CheckoutPayment from '../components/CheckoutPayment'

// var product_data = require('../products.json');
// const uuidv4 = require('uuid/v4');

function Checkout(props) {
    const [ordering, setOrdering] = useState(false)
    const [card, setCard] = useState(0)
    const [totalPurchase, setTotal] = useState(0)
    const [orderComplete, setOrderComplete] = useState(false)
    const [method, setMethod] = useState("noDonate")
    const [donate, setDonate] = useState(0)


    var {user, cart, items, clearCart} = useContext(AppContext)
    console.log('user info', typeof(getAtt('custom:postcode')));

    const quantText = (cart.items.length === 1) ? '1 item' : cart.items.length + ' items'

    function handleCardUpdate(e) {
        setCard(e.value)
    }

    function submitOrder() {
        // setCheckOut(true)
        setOrderComplete(true)
    }
   
    function handleDonateMethod(value) {
        setMethod(value);
    }

    function handleDonateAmount() {
        console.log('check event', )

    }
    
    function getProjects() {
        // Search Project base on Zip Code

    }

    function getAtt(name) {
        return user ? user[name] : ""
    }
    

    useEffect(() => {
        function calculateTotal() {
            var total = 0
            var _item = null
            cart.items.map((item) => {
                var _product = items.filter(function (el) {
                    return el.id === item.id
                })
    
                _product.length === 1 ? _item = _product[0] : _item = null
                total += (_item.price * item.quantity)
                return null
            })

            switch (method) {
                case "roundUp":
                    const newtotal = parseFloat(Math.ceil(total)).toFixed(2)
                    setDonate(parseFloat(newtotal - total).toFixed(2))
                    total = newtotal
                    break
                
                case "other":
    
                    break
    
                case "noDonate":
                    setDonate(0)
                    break
                
                default:
                    return;           
            }
             
    
            setTotal(parseFloat(total).toFixed(2))
            return parseFloat(total).toFixed(2)
        }

        calculateTotal()
    }, [cart.items, items, method, donate])

    useEffect(() => {
        if (orderComplete) {
            // Analytics.updateEndpoint({
            //     attributes: {
            //         hasShoppingCart: ['false'],
            //         completedOrder: ['true']
            //     },
            //     metrics: {
            //         itemsInCart: 0,
            //         orderNumber: "1001"
            //     }
            // })

            console.log("Purchase price", totalPurchase)

            // var _mTotal = parseFloat(totalPurchase).toFixed(2)
            // Analytics.record('_monetization.purchase', {
            //     _currency: 'USD',
            //     _product_id: 'XYZ',
            //   }, {
            //     _item_price: _mTotal,
            //     _quantity: 1.0,
            //   })

            clearCart()

            props.history.push('/')
        }
    }, [orderComplete, props.history, clearCart, totalPurchase]);

    return (
        <div>
            <InitState/>
            <CheckoutBanner quantity={quantText}/>
            <div style={mainDiv}>
                <Grid columns={2}>
                    <Grid.Row>
                    <Grid.Column floated='left' width={11}>
                        <CheckoutSummary placedOrder={ordering} 
                                         onCardUpdate={handleCardUpdate} 
                                         onOrder={submitOrder}
                                         user={user}
                                         cart={cart}
                                         total={totalPurchase}
                                         />
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                        <CheckoutPayment placedOrder={ordering} 
                                         onOrder={submitOrder}
                                         user={user}
                                         cart={cart}
                                         total={totalPurchase}
                                         />
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid colums={3}>
                    <Grid.Row>
                        <Grid.Column width={5}>Project1</Grid.Column>
                        <Grid.Column width={5}>Project2</Grid.Column>
                        <Grid.Column width={5}>Project3</Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <b>Do you want support your Community?</b>
                    </Grid.Row>
                    <Grid.Row>
                        <Form>
                            <Form.Field>
                                Donate Amount: <b>{donate}</b>
                            </Form.Field>
                            <Form.Field>
                            <Radio
                                label='Round Up'
                                value='roundUp'
                                name='radioGroup'
                                checked={method === "roundUp"}
                                onChange={() =>handleDonateMethod("roundUp")}
                            />
                            </Form.Field>
                            <Form.Field>
                            <Radio
                                label='Other'
                                value='Other'
                                name='radioGroup'
                                checked={method === "other"}
                                onChange={() => handleDonateMethod("other")}
                            />
                            <Input labelPosition='left' type='number' placeholder='0' disabled={method !== "other"} onChange={()=>handleDonateAmount}>
                                <Label basic>$</Label>
                                <input />
                            </Input>
                            </Form.Field>
                            <Form.Field>
                            <Radio
                                label='Not this time'
                                value='noDonate'
                                name='radioGroup'
                                checked={method === "noDonate"}
                                onChange={() => handleDonateMethod("noDonate")}
                            />
                            </Form.Field>
                        </Form>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}

export default Checkout

const mainDiv = {
    marginLeft: '5em',
    marginRight: '1em',
    marginTop: '2em'
}