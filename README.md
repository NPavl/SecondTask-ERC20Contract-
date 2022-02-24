## Test task number 2 (ERC20 Token)

#### Token contract address (Rinkiby): 
0x9E1765B00c1EE2eeB38c93EE2997c138024840D2
#### Etherscan verify: 
https://rinkeby.etherscan.io/address/0x9E1765B00c1EE2eeB38c93EE2997c138024840D2#code

### Description task: 
#### Написать токен стандарта ERC-20
 - Реализовать весь основной функционал контракта. Не наследовать от openzeppelin и прочих библиотек и не      копировать код (!)
 - Добавить функции mint и burn
 - Написать полноценные тесты к контракту
 - Написать скрипт деплоя
 - Задеплоить в тестовую сеть
 - Написать таски на transfer, transferFrom, approve
 - Верифицировать контракт

#### Требования!

- Все ERC20 токены в сети должны удовлетворять стандарту описанному в [eip]https://eips.ethereum.org/EIPS/eip-20.
- Содержать полный набор функций из [eip-20]https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md.
- Реализация логики и ответственность за правильность лежит на вас, впрочем в сети полно примеров ERC20 токенов, где можно посмотреть как обычно выглядит реализация подобных токенов.

#### All packages:
```
yarn init 
yarn add --save-dev hardhat 
yarn add --dev @nomiclabs/hardhat-ethers ethers 
yarn add --dev @nomiclabs/hardhat-waffle ethereum-waffle chai
yarn add --save-dev @nomiclabs/hardhat-etherscan
yarn add install dotenv
yarn add --dev solidity-coverage
yarn add --dev hardhat-gas-reporter 
yarn add hardhat-gas-reporter --dev
```
#### Main command:
```
npx hardhat 
npx hardhat run scripts/file-name.js
npx hardhat test 
npx hardhat coverage
npx hardhat run --network localhost scripts/deploy.js
npx hardhat verify --constructor-args scripts/arguments.js 0x9E1765B00c1EE2eeB38c93EE2997c138024840D2 --network rinkiby
```
#### Test Report:
![]
#### Coverage report: 
![] 
#### Gas report:
![] 
