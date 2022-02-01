import React, {useState, useEffect } from 'react';
import styled from 'styled-components'


function Mong() {

  const [tokens, setData] = useState([]);
  const [honey, setHoney] = useState([]);


  const getMong = async function () {

    const res_1 = await fetch(`https://tokenfomo.io/api/tokens/eth?limit=5&apikey=0e14821c9127c495bf15d690dc02a96386980392`)
    const data_1 = await res_1.json()
    const address = [];
    const pot = [];
    setData(data_1)


    for (let i = 0; i < data_1.length; i++) {
      address.push(data_1[i].addr)
    }

    for (let j = 0; j < address.length; j++) {
      const res_2 = await fetch(`https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=eth&token=${address[j]}`)
      const data_2 = await res_2.json()

      pot.push(data_2)
    }
    setHoney(pot)
    // setHoney(data_2)
    //  address.map((addr) => {
    //   fetch()
    //   .then((res) => res.json())
    //   .then((data) => {
    //    return  setHoney(data)
    //   })
    // })




    }







  useEffect(() => {
      getMong()
}, []);


  return (


 <Wrapper>

      <h3>New Tokens</h3>

        {tokens.map((token) => {
          const {addr, name, network, symbol, timestamp} = token;
          return (
            <div className='block' >
                <article>

                  <p> Address: {addr} </p>
                  <p> Name: {name} </p>
                  <p> Network: {network} </p>
                  <p> Ticker: {symbol} </p>
                  <p> Time: {timestamp} </p>

                  </article>
                  </div>

          );

        })
        }



       {honey.map((honey) => {
          const {BuyGas, BuyTax, Error, IsHoneypot, MaxTxAmount, MaxTxAmountBNB, SellGas, SellTax} = honey;
          return (

            <div className='block' >
                <article>
                  <p> Name: {} </p>
                  <p> Liquidity: {BuyGas} </p>
                  <p> Buy Tax: {BuyTax} </p>
                  <p> Error: {Error} </p>
                  <p> Honey Pot: {IsHoneypot.toString()} </p>
                  <p> Max Token Amount: {MaxTxAmount} </p>
                  <p> Max Token BNB: {MaxTxAmountBNB} </p>
                  <p> Sell Gas: {SellGas} </p>
                  <p> Sell Tax: {SellTax} </p>



                  </article>
                  </div>

          );

        })
        }


        </Wrapper>
  );
      }


const Wrapper = styled.div `
display: grid;
justify-content: center;
grid-gap: 1rem;

width: 100%;
  .block {
    display: grid;
    border: 5px solid black;
    padding: 5px;
    background-color: lightblue;

  }
  article {
    border: 2px solid black;
    padding: 5px;
    background-color: white;
  }

`

export default Mong;