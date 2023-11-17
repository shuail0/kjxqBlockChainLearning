
// 连接区块链
const { Wallet, Provider } = require('zksync-web3');  // 倒入zksync-web3库
const ethers = require('ethers');
const zksync = require('zksync-web3')

const zksyncRpc = 'https://mainnet.era.zksync.io';  // zksyncRPC
const ethereumRpc = 'https://eth-mainnet.g.alchemy.com/v2/dGKzHam8VrW1mAfkUY6aKcDesok1Vl9R';  // 主网RPC
const privateKey = 'f1ff65217004ea978cc2b0dfe2c6013d9fe2da9736a81dd1192e099c5bfcb66f';  // 私钥

const zksProvider = new Provider(zksyncRpc); // 连接zksyncProvider
const ethereumProvider = new ethers.getDefaultProvider(ethereumRpc);  // 连接以太坊Provider
// 实例

const zksyncWallet = new Wallet(privateKey, zksProvider, ethereumProvider); // 创建zksync钱包类
const ethereumWallet = new ethers.Wallet(privateKey, ethereumProvider);  // 创建ethereum钱包类


; (
    async () => {

        // 查询信息

        // const gasPrice = await ethereumProvider.getGasPrice() // 查询主网gas信息 （用主网的provider）
        // console.log('gasPrice BigNumber: ', gasPrice);
        // console.log('gasPrice Number:',ethers.utils.formatUnits(gasPrice, 9))

        // zksProvider.getBlock().then(console.log)  // 获取最新区块信息

        // const balance = await zksyncWallet.getBalance(zksync.utils.ETH_ADDRESS)  // 查询钱包余额
        // console.log('balance:', balance, ethers.utils.formatEther(balance))
        // console.log('balance:', balance, ethers.utils.formatUnits(balance, 6))


        /**
         * 更多操作可以查看zksync javaScript Ethers V5 SDK中的 Providers和wallet部分：
         * https://era.zksync.io/docs/api/js/providers.html
         * https://era.zksync.io/docs/api/js/accounts.html#connecting-to-the-ethereum-provider
         */


        // 使用钱包执行转账操作
        // zksyncWallet.transfer({
        //     to:'0xF8715a4a8232b1733F690cd80029F66675AE8Fb7',
        //     token: zksync.utils.ETH_ADDRESS,
        //     amount: ethers.utils.parseEther("0.0001")
        //   })



        // 连接合约

        const USDCAddress = '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4';  // USDC合约地址
        const USDCAbi = require('./ABIs/erc20.json'); // USDC合约ABI
        const USDCContract = new ethers.Contract(USDCAddress, USDCAbi, zksyncWallet);

        // 读取合约状态
        // USDCContract.name().then(console.log)  // 获取token名字
        // USDCContract.decimals().then(console.log)  // 获取token精度
        // USDCContract.symbol().then(console.log)  // 获取token Synbol
        // USDCContract.balanceOf(zksyncWallet.address).then(console.log)  // 查余额（和token合约直接交互)


        // 合约写入操作
        // 以授权syncSwapRouter使用100USDC为例

        const syncSwapRouter = '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295';  //syncswap Router合约地址

        const approveAmount = ethers.BigNumber.from(100, 6);  // 授权数量，这里是授权使用100个USDC

        const response = await USDCContract.approve(syncSwapRouter, approveAmount) // 调用授权
        
        const tx = await response.wait();
        console.log(tx)


    }
)()