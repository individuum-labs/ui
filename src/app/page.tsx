"use client";

import {
  IProvider,
  UserInfo,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import {EthereumPrivateKeyProvider} from "@web3auth/ethereum-provider";
import {Web3Auth} from "@web3auth/modal";
import Image from "next/image";
import {useEffect, useState} from "react";
import {arbitrumSepolia} from "viem/chains";
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  getAbiItem,
  getCreateAddress,
  http,
  parseAbiItem,
  parseEther,
  parseUnits,
} from "viem";

const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: {
      chainId: `0x${arbitrumSepolia.id.toString(16)}`, // Please use 0x1 for Mainnet
      rpcTarget: arbitrumSepolia.rpcUrls.default.http[0],
      displayName: arbitrumSepolia.name,
      blockExplorerUrl: arbitrumSepolia.blockExplorers.default.url,
      ticker: arbitrumSepolia.nativeCurrency.symbol,
      tickerName: arbitrumSepolia.nativeCurrency.name,
      logo: "https://images.toruswallet.io/eth.svg",
      chainNamespace: "eip155",
    },
  },
});

const openloginAdapter = new OpenloginAdapter({
  privateKeyProvider: ethereumPrivateKeyProvider,
});
const web3auth = new Web3Auth({
  clientId:
    "BGzZ5_eraJ8GJR2Idoy8yAKiaffmULDbcub-t2CIVrx-GEXjcSP5ChqJqBQ9T78AVSqWb30fgBOWO4D1696gdIg",
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: ethereumPrivateKeyProvider,
});
web3auth.configureAdapter(openloginAdapter);

const bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000d3738038062000d378339810160408190526200003491620000f2565b6000839055600182905560026200004c82826200026a565b506040516323b872dd60e01b8152336004820152306024820152604481018390527375faf114eafb1bdbe2f0316df893fd58ce46aa4d906323b872dd906064016020604051808303816000875af1158015620000ac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000d2919062000336565b5050505062000361565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156200010857600080fd5b835160208086015160408701519295509350906001600160401b03808211156200013157600080fd5b818701915087601f8301126200014657600080fd5b8151818111156200015b576200015b620000dc565b604051601f8201601f19908116603f01168101908382118183101715620001865762000186620000dc565b816040528281528a868487010111156200019f57600080fd5b600093505b82841015620001c35784840186015181850187015292850192620001a4565b60008684830101528096505050505050509250925092565b600181811c90821680620001f057607f821691505b6020821081036200021157634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200026557600081815260208120601f850160051c81016020861015620002405750805b601f850160051c820191505b8181101562000261578281556001016200024c565b5050505b505050565b81516001600160401b03811115620002865762000286620000dc565b6200029e81620002978454620001db565b8462000217565b602080601f831160018114620002d65760008415620002bd5750858301515b600019600386901b1c1916600185901b17855562000261565b600085815260208120601f198616915b828110156200030757888601518255948401946001909101908401620002e6565b5085821015620003265787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6000602082840312156200034957600080fd5b815180151581146200035a57600080fd5b9392505050565b6109c680620003716000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806311a4d31c1461005c5780631cee07001461007a57806334138814146100a857806384f7a504146100b15780639e0ffbce146100c6575b600080fd5b6100646100cf565b6040516100719190610704565b60405180910390f35b61009a61008836600461071e565b60036020526000908152604090205481565b604051908152602001610071565b61009a60015481565b6100c46100bf366004610780565b61015d565b005b61009a60005481565b600280546100dc90610803565b80601f016020809104026020016040519081016040528092919081815260200182805461010890610803565b80156101555780601f1061012a57610100808354040283529160200191610155565b820191906000526020600020905b81548152906001019060200180831161013857829003601f168201915b505050505081565b600086868686604051602001610176949392919061083d565b60405160208183030381529060405290506101e37349dc27b14cfee893e4ac9e47984ca6b2dccd7a2e828051906020012085858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061038192505050565b506102ae600280546101f490610803565b80601f016020809104026020016040519081016040528092919081815260200182805461022090610803565b801561026d5780601f106102425761010080835404028352916020019161026d565b820191906000526020600020905b81548152906001019060200180831161025057829003601f168201915b505050505086868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506103e392505050565b600086815260036020526040812054906102c8828a610890565b60008981526003602052604081208b9055549091507375faf114eafb1bdbe2f0316df893fd58ce46aa4d9063a9059cbb9033906103069085906108a9565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015610351573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037591906108c0565b50505050505050505050565b600080600061039085856104bd565b50909250905060008160038111156103aa576103aa6108e2565b1480156103c85750856001600160a01b0316826001600160a01b0316145b806103d957506103d986868661050a565b9695505050505050565b815181518391839110156103f657600080fd5b6000805b835183516104089190610890565b81116104ab57600160005b85518110156104875785818151811061042e5761042e6108f8565b01602001516001600160f81b03191685610448838661090e565b81518110610458576104586108f8565b01602001516001600160f81b031916146104755760009150610487565b8061047f81610921565b915050610413565b5080156104985760019250506104ab565b50806104a381610921565b9150506103fa565b50806104b657600080fd5b5050505050565b600080600083516041036104f75760208401516040850151606086015160001a6104e9888285856105e5565b955095509550505050610503565b50508151600091506002905b9250925092565b6000806000856001600160a01b0316858560405160240161052c92919061093a565b60408051601f198184030181529181526020820180516001600160e01b0316630b135d3f60e11b17905251610561919061095b565b600060405180830381855afa9150503d806000811461059c576040519150601f19603f3d011682016040523d82523d6000602084013e6105a1565b606091505b50915091508180156105b557506020815110155b80156103d957508051630b135d3f60e11b906105da9083016020908101908401610977565b149695505050505050565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a084111561062057506000915060039050826106aa565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610674573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166106a0575060009250600191508290506106aa565b9250600091508190505b9450945094915050565b60005b838110156106cf5781810151838201526020016106b7565b50506000910152565b600081518084526106f08160208601602086016106b4565b601f01601f19169290920160200192915050565b60208152600061071760208301846106d8565b9392505050565b60006020828403121561073057600080fd5b5035919050565b60008083601f84011261074957600080fd5b50813567ffffffffffffffff81111561076157600080fd5b60208301915083602082850101111561077957600080fd5b9250929050565b6000806000806000806080878903121561079957600080fd5b8635955060208701359450604087013567ffffffffffffffff808211156107bf57600080fd5b6107cb8a838b01610737565b909650945060608901359150808211156107e457600080fd5b506107f189828a01610737565b979a9699509497509295939492505050565b600181811c9082168061081757607f821691505b60208210810361083757634e487b7160e01b600052602260045260246000fd5b50919050565b84815283602082015260606040820152816060820152818360808301376000818301608090810191909152601f909201601f191601019392505050565b634e487b7160e01b600052601160045260246000fd5b818103818111156108a3576108a361087a565b92915050565b80820281158282048414176108a3576108a361087a565b6000602082840312156108d257600080fd5b8151801515811461071757600080fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b808201808211156108a3576108a361087a565b6000600182016109335761093361087a565b5060010190565b82815260406020820152600061095360408301846106d8565b949350505050565b6000825161096d8184602087016106b4565b9190910192915050565b60006020828403121561098957600080fd5b505191905056fea2646970667358221220bab28fe7dc6c5077b9a4a00aa8f401ec00eba61478e33bf4b0435f9dbe73b60864736f6c63430008140033";

export default function Home() {
  const [user, setUser] = useState<Partial<UserInfo> | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);

  useEffect(() => {
    (async () => {
      await web3auth.initModal();
      setProvider(web3auth.provider);
    })();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col gap-8">
      <div className="w-full p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Individum</h1>

        {user ? (
          user.profileImage ? (
            <Image
              onClick={() => web3auth.logout()}
              src={user.profileImage}
              height={50}
              width={50}
              className="rounded-full"
              alt="user"
            />
          ) : (
            user!.name
          )
        ) : (
          <button
            onClick={async () => {
              const provider = await web3auth.connect();
              console.log(provider);
              setUser(await web3auth.getUserInfo());
              setProvider(provider);
              console.log(await web3auth.authenticateUser());
              console.log(web3auth.connected);
            }}
          >
            Login
          </button>
        )}
      </div>
      <div className="w-full px-16 flex flex-col gap-4">
        <div className="w-full p-4 py-8 flex items-center justify-between">
          <p className="text-lg font-semibold">Create a new order</p>
          <input
            placeholder="Price (USD) per like"
            type="number"
            className="outline-none px-5 py-2 border-2 border-zinc-300 rounded-md"
          />
          <input
            placeholder="Total Budget (USD)"
            type="number"
            className="outline-none px-5 py-2 border-2 border-zinc-300 rounded-md"
          />

          <button
            className="bg-zinc-800 text-white font-semibold text-md px-5 py-2 rounded-md"
            onClick={async () => {
              const client = createPublicClient({
                transport: http(arbitrumSepolia.rpcUrls.default.http[0]),
              });
              const wallet = createWalletClient({
                transport: custom(provider!),
              });
              const approveTx = await wallet.writeContract({
                abi: erc20Abi,
                functionName: "approve",
                address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
                args: [
                  getCreateAddress({
                    from: (await wallet.getAddresses())[0],
                    nonce: BigInt(
                      (await client.getTransactionCount({
                        address: (await wallet.getAddresses())[0],
                      })) + 1
                    ),
                  }),
                  parseUnits("10", 6),
                ],
                chain: arbitrumSepolia,
                account: (await wallet.getAddresses())[0],
              });
              let receipt = await client.waitForTransactionReceipt({
                hash: approveTx,
              });
              console.log(approveTx, receipt);
              const tx = await wallet.deployContract({
                abi: [
                  parseAbiItem(
                    "constructor(uint _reward_rate, uint _total_funds, string _required_string)" as const
                  ),
                ],
                bytecode,
                args: [parseUnits("10", 6), parseUnits("1", 6), "ETHGlobal"],
                chain: arbitrumSepolia,
                account: (await wallet.getAddresses())[0],
                gas: BigInt(730000),
              });
              receipt = await client.waitForTransactionReceipt({
                hash: tx,
              });
              console.log(tx, receipt);
              console.log(tx);
            }}
          >
            Create Order
          </button>
        </div>
        <div className="w-full border-2 border-zinc-300 rounded-lg p-4 py-8 flex items-center justify-between">
          <p>
            Tweet including <strong>@ethglobal</strong>
          </p>
          <p>1$/like</p>
          <p>Remaining budget: 10$</p>
          <button
            className="bg-zinc-800 text-white font-semibold text-md px-5 py-2 rounded-md"
            onClick={async () => {
              const escrow = "0x3BEAf78dB7Ad7B39A3e067D60179E0ae4483F77b";
              const client = await window.tlsn.connect();
              const accountProof = await client.getProof(
                (
                  await client.getHistory(
                    "get",
                    "https://api.x.com/1.1/account/settings.json"
                  )
                )[0].id
              );
              const tweetProof = await client.getProof(
                (
                  await client.getHistory(
                    "get",
                    "https://x.com/i/api/graphql/QVo2zKMcLZjXABtcYpi0mA/TweetDetail*"
                  )
                )[0].id
              );
              console.log(accountProof, tweetProof);
              const data = await (
                await fetch(`http://localhost:5000/verify`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    account: accountProof,
                    post: tweetProof,
                  }),
                })
              ).json();
              const rpc = createPublicClient({
                transport: http(arbitrumSepolia.rpcUrls.default.http[0]),
              });
              const wallet = createWalletClient({
                transport: custom(provider!),
              });
              const tx = await wallet.writeContract({
                abi: [
                  parseAbiItem(
                    "function process_post(uint likes, uint post_id,  string calldata full_text, bytes calldata signature)" as const
                  ),
                ],
                address: escrow,
                functionName: "process_post",
                account: (await wallet.getAddresses())[0],
                args: [
                  BigInt(data.data.favourite_count),
                  BigInt(data.data.post_id),
                  data.data.full_text,
                  `0x${Buffer.from(data.signature_r).toString(
                    "hex"
                  )}${Buffer.from(data.signature_s).toString(
                    "hex"
                  )}${Buffer.from([data.signature_v]).toString("hex")}`,
                ],
                chain: arbitrumSepolia,
                gas: BigInt(500000),
              });
              console.log(tx);
            }}
          >
            Fill order
          </button>
        </div>
      </div>
    </div>
  );
}
