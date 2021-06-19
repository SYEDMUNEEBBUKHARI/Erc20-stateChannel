import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import web3 from "../../web3";
import LandAbi from "../../Abi";
export default class CloseChannelForm extends React.Component {

    constructor(props) {
        super(props)
    }
state={
    v:'',
    s:'',
    r:'',
    wei:'',
    account:''
}


  wei(value){
    this.setState({
         wei: value
    });
}


    v(value){
        this.setState({
             v: value
        });
        
    }
    
    s(value){
        this.setState({
             s: value
        });
        
    }
    
    r(value){
        this.setState({
             r: value
        });
        
    }
    render() {
        return (
            <div>
                <h1>Transfer Amount After validating and Close existing Payment Channel</h1>
                <input type="text" placeholder="Wei Transferred" value={this.state.wei} onChange={e => this.wei(e.target.value)} ref="valueTransferred"/>
                <input type="text" placeholder="v" value={this.state.v} onChange={e => this.v(e.target.value)} ref="v"/>
                <input type="text" placeholder="r" value={this.state.r} onChange={e => this.r(e.target.value)} ref="r"/>
                <input type="text" placeholder="s" value={this.state.s} onChange={e => this.s(e.target.value)} ref="s"/>
                <input type="submit" onClick={this.closeChannel.bind(this)}/>
            </div>
        );
    }

   
    async closeChannel() {
       

        console.log("Clicked",this.props.recipientAddress, this.state.wei, this.state.v, this.state.r, this.state.s);
        let data= await LandAbi.methods.transfer(this.props.recipientAddress, this.state.wei, this.state.v, this.state.r, this.state.s).call({from:'0xa2C1ee3dd1ac4b8Ed475396Fd1EF044Bcd25A40A',value: 50});
        console.log("data",data);
    }
}