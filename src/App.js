import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";

const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "getGroupIds",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "_groupId", type: "uint256" }],
    name: "getGroup",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint256[]", name: "indexes", type: "uint256[]" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "_indexId", type: "uint256" }],
    name: "getIndex",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint256", name: "ethPriceInWei", type: "uint256" },
      { internalType: "uint256", name: "usdPriceInCents", type: "uint256" },
      {
        internalType: "uint256",
        name: "usdCapitalization",
        type: "uint256",
      },
      { internalType: "int256", name: "percentageChange", type: "int256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const address = "0x4f7f1380239450AAD5af611DB3c3c1bb51049c29";

function App() {
  const [state, setState] = useState([]);

  const arrayGroupe = () => {
    const arrayGroupe = {};
    state.forEach((item) => {
      const firstWord = item.name.split(" ")[0];

      if (arrayGroupe[firstWord]) {
        arrayGroupe[firstWord] = [...arrayGroupe[firstWord], item];
      } else {
        arrayGroupe[firstWord] = [item];
      }
    });

    return arrayGroupe;
  };

  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/86b71801f81543619dc99e35092f4744"
      )
    );

    web3.eth.defaultAccount = web3.eth.accounts[0];

    const contract = new web3.eth.Contract(abi, address);

    const newArr = [];

    contract.methods
      .getGroupIds()
      .call({ from: address }, async (err, result) => {
        if (err) {
          return;
        }

        result.forEach((id) => {
          contract.methods
            .getGroup(id)
            .call({ from: address }, (err, result) => {
              if (err) return;

              const lastIndex = [...result.indexes].reverse()[0];

              result.indexes.forEach((index) => {
                contract.methods
                  .getIndex(index)
                  .call({ from: address }, (err, item) => {
                    if (err) return;

                    newArr.push(item);

                    if (lastIndex === index) {
                      setState((prev) => [...prev, ...newArr]);
                    }
                  });
              });
            });
        });
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <List arrayGroupe={arrayGroupe()} />
    </div>
  );
}

export default App;
