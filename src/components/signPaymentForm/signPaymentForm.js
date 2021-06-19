import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import web3 from "../../web3";
import LandAbi from "../../Abi";
import ClosePayment from "../closePaymentChannel/closePaymentChannel";
export default class SignPaymentForm extends React.Component {

   state={
       v:'',
       r:'',
       s:'',
       sign:null
   }
   web3Utils = require('web3-utils')

  async  signOffChainPayment() {
        /*
        * Sign a string and return (hash, v, r, s) used by ecrecover to regenerate the coinbase address;
        */
    console.log("proppp",this.props)
        const encodedMsg = this.web3Utils.soliditySha3(
          {
            type: 'address',
            value: this.props.senderAddress
          },
          {
            type: 'address',
            value: this.props.recipientAddress
          },
          {
            type: 'uint',
            value: this.props.valueToTransfer
          }
        ) 
         web3.eth.sign(encodedMsg,this.props.senderAddress).then((d)=>
         {
           console.log("d",d);
        var r = `0x${d.slice(0, 64)}`;
        var s = `0x${d.slice(64, 128)}`;
        var v = d.slice(128, 130);
        console.log("r",r,"s",s,"v",v);
    
        this.setState(
          {
            v: v, 
            r: r,
            s: s
          }
        )
    
        return {encodedMsg, v, r, s};
        
        });
         this.state.sig &&  console.log("state",this.state.sig);
         // console.log("sig",sig)
        // var r = `0x${sig.slice(0, 64)}`;
        // var s = `0x${sig.slice(64, 128)}`;
       
        // var v = web3.utils.toDecimal(sig.slice(128, 130)) + 27;
        // console.log("r",r,"s",s,"v",v);
    
        // this.setState(
        //   {
        //     v: v, 
        //     r: r,
        //     s: s
        //   }
        // )
    
        // return {encodedMsg, v, r, s};
      }

    
    render() {
        return (
            <div>
                <h1>Sign Transaction</h1>
                <input type="text" placeholder="Wei to Transfer" ref="transferValue"/>
                <input type="submit" onClick={this.signOffChainPayment.bind(this)}/>
                <h3>v: {this.state.v}</h3>
                <h3>r: {this.state.r}</h3>
                <h3>s: {this.state.s}</h3>


<ClosePayment senderAddress={this.props.senderAddress}  recipientAddress={this.props.recipientAddress} />
            </div>
        );
    }

    
}