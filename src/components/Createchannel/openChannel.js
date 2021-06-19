import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LandAbi from "../../Abi";
import web3 from "../../web3";
import SignPayment from "../../components/signPaymentForm/signPaymentForm";
export default class OpenChannelForm extends React.Component {

   state={
    senderAddress:'',
    recipientAddress:'',
    deposit:'',
    account:''
   }

   async componentDidMount(){
  
    if(window.ethereum) {
      await ethereum.enable();
  }
    this.getAccounts((result) =>{
      console.log("account 0",result[0]);
      this.setState({account:result});
    });
  }
   getAccounts(callback) {
    web3.eth.getAccounts((error,result) => {
        if (error) {
            console.log(error);
        } else {
            callback(result);
        }
    });
  }
  
  async componentDidMount(){
    const account= await web3.eth.getAccounts;
    var result = await LandAbi.methods.totalSupply().call();
    this.setState({account: account});
  console.log("account",account);
   }
    onSenderAddress(value){
        this.setState({
             senderAddress: value
        });
       
    }
    onRecipientAddress(value){
        this.setState({
             recipientAddress: value
        });
     
    }
    onDeposit(value){
        this.setState({
             deposit: value
        });
        
    }
    render() {
        return (
            <div>
                <h1>Open new Payment Channel</h1>
                <input type="text" placeholder="Sender Address" value={this.state.senderAddress} onChange={e => this.onSenderAddress(e.target.value)} ref="senderAddress"/>
                <input type="text" placeholder="Recipient Address" ref="recipientAddress" onChange={e => this.onRecipientAddress(e.target.value)}/>
                <input type="text" placeholder="Deposit" ref="collateral"   onChange={e => this.onDeposit(e.target.value)}/>
                <input type="submit" onClick={this.openChannel.bind(this)}/>


                <SignPayment  senderAddress={this.state.senderAddress} recipientAddress={this.state.recipientAddress}  valueToTransfer={this.state.deposit} />
            </div>
        );
    }

    async openChannel() {
        var senderAddress = this.state.senderAddress;
        var recipientAddress = this.state.recipientAddress
        var collateral =this.state.deposit;
        console.log("value ",senderAddress,'rec',recipientAddress,'de',collateral);
        const data = await LandAbi.methods.openChannel(recipientAddress).call({from: this.state.account[0],value: this.state.deposit});
        console.log("data",data);
    }
}