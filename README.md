# Balance/Sheeter

## これは何
貸借対照表を箱型グラフにするやつ。

![image](https://user-images.githubusercontent.com/7953751/57177857-5d90b500-6ea3-11e9-994d-d0caff6d96b7.png)

## Usage
```bash
$ npm start
```
open http://localhost:3000

## 例
- [Microsoft FY2018](https://s2terminal.github.io/balance-sheeter/?bs=%7B%22title%22%3A%22NASDAQ%3A+MSFT%22%2C%22bs%22%3A%5B%7B%22date%22%3A%22FY2018%22%2C%22cash%22%3A11946%2C%22currentAssets%22%3A157716%2C%22nonCurrentAssets%22%3A89186%2C%22currentLiabilities%22%3A58488%2C%22nonCurrentLiabilities%22%3A117642%2C%22equity%22%3A82718%7D%5D%7D)
- [トヨタ自動車 FY2018](https://s2terminal.github.io/balance-sheeter/?bs=%7B%22bs%22%3A%5B%7B%22date%22%3A%22FY2018%2F03%22%2C%22cash%22%3A2995075%2C%22currentAssets%22%3A37045501%2C%22nonCurrentAssets%22%3A10267673%2C%22currentLiabilities%22%3A17796891%2C%22nonCurrentLiabilities%22%3A12589282%2C%22equity%22%3A19922076%7D%5D%2C%22title%22%3A%227203-FY2018%2F03%22%7D)

## 参考文献
[3秒でバランスシートが読める本 \| 中村 儀一](https://www.amazon.co.jp/gp/product/4860638239)

## LISENCE
[MIT](LICENSE).
