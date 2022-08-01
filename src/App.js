import './App.css';
import React from 'react';
import {ethers} from 'ethers';
import Contract from './artifacts/contracts/MonICO.sol/MonICO.json'
const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAccount: "0x000000000000000000",
            contract: null,
            hardcap: 0,
            tokenAmount: 0,
        };
    }

    componentDidMount() {
        this.requestAccount();
    }

    requestAccount = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length !== 0) {
            this.setState({currentAccount: accounts[0]});
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
            this.setState({contract: contract});
            const hardcap = await contract.hardCap();
            const tokenAmount =  await contract.tokenAmount();
            console.log(ethers.utils.formatEther(tokenAmount))
            this.setState({hardcap: ethers.utils.formatEther(hardcap), tokenAmount: ethers.utils.formatEther(tokenAmount)});
        }
    }

    buyTokens = async () => {
        const buyTokens = await this.state.contract.buyTokens();
    }

    render() {
        return (
            <div className="App mx-20 my-10">
                <p className="text-base text-white">
                    Wallet : {this.state.currentAccount.slice(0,5)+'...'+this.state.currentAccount.slice(38,42)}
                </p>
                <h2 className="text-2xl text-white my-2">Buy $MTKN at the best price :</h2>

                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Buy 50000 $MTKN
                </button>
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Buy 100000 $MTKN
                </button>
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">{ this.state.tokenAmount } $MTKN</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">HardCap : { this.state.hardcap }</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: (this.state.tokenAmount*100/this.state.hardcap) + "%"}}></div>
                </div>
                <button type="button"
                        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Claim my Token
                </button>
            </div>
        );
    }
}

export default App;
