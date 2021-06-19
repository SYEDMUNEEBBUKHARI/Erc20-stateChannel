import LandAbi from "./Abi";
import web3 from "./web3";
import './App.css';
import OpenChannel from "./components/Createchannel/openChannel";

import React from "react";


class App extends React.Component {


  state={
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


  render(){

    
    async function openChannel(senderAddress, recipientAddress, collateral) {
      console.log("called");
      return LandAbi.methods.openChannel(
          recipientAddress, 
          {from: senderAddress, gas: 4712388, value: collateral}
      ).then(txHash => {
        this.setState(
          {
            senderAddress: senderAddress, 
            recipientAddress: recipientAddress,
            channelCollateral: collateral
          }
        )
      })
    };

  return (
    <div className="App">
     <h1> ERC 20</h1>

<OpenChannel openChannel={openChannel.bind(this)} />

     
    </div>
  );
  }
}

export default App;
