# Flashloan NFT

Protocol for Non Fungible Token flash loans.

This protocol enables a secure deposit of an `ERC-721` tokens and create a flash loans.

STATUS: Work in progress.

## Why flash loans?

We all heard about the amazing featurs of flash loans. Before, if you spot an arbitrage opportunity you need to have a big capital to use it. The process can be cumbersome as it may involve: taking a normal loan (if you non liquid which is a subject for a collateral), exchange the liquidity, close a trade, pay back the loan. It's costly and more risky. Moreover if you don't have enough capital, you can't take an advantage of arbitrage.

Flash loans solve that issues. With flash loan, everything is happening atomically in the same transaction. Hence you don't even need a collateral - it's enough if there is enough liquidity in a flash loan pool. It's even more secure (assuming no bugs in code). Flash loan requires that by the end of the transaction it is fully payed off. With that we we don't risk loosing funds - if something goes wrong (we loose money, loan can't be payed off), the transaction will not finish - it will be rolled back.

It's worth to note that this exposes new ways of moving and managing funds and more risks to other smart-contracts - as this exposes more sophisticated transactions between smart-contracts. In February 2020 this lead to sophisticated transactions exposing holes in pricing mechanism in decentralized exchanges. This is well documented in a Coindesk article: [Everything You Ever Wanted to Know About the DeFi ‘Flash Loan’ Attack](https://www.coindesk.com/everything-you-ever-wanted-to-know-about-the-defi-flash-loan-attack).


## What about NFTs?

NFTs are more complex. They are not fungible, hence the standard flashloan protocol won't work with NFTs like badges, collectibles, certificates etc... Yet there is lot of opportunity to explore here.

More about it in an upcoming blog post on my [blog](http://blog.zaremba.ch).


## Specing

This are the decisions to be thought around and spec:

+ Fee mechanism: fixed or dynamic or per-user.
+ amount of pools vs dynamic pools

+ Consider adding ERC721x Pool
+ add support for ERC-165


### Efficiency

For efficient loan browsing we need an off-chain solution. Smart-contracts are too limited and too expensive for that.


## License

Copyright (C) 2020 Robert Zaremba

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
