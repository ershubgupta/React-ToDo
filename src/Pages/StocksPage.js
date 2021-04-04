import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col, Card, CardColumns } from 'react-bootstrap';

export default function StocksPage() {
  // const { news, setNews } = useState('news');
  // const [stockCategory, setStockCategory] = useState('business');
  // changeNewCategory = (e) => {
  //   setNewCategory(e.target);
  // }
  const [stock, setStock] = useState({list:[]});
  // const [ur]
  useEffect(() => {
    const fetchData = async () => {
      // console.log(newsCategory)
      const stockFeed = await axios(
        // 'http://dummy.restapiexample.com/api/v1/employees'
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=I27YCHHV5BLDR8BF'
        // 'https://hn.algolia.com/api/v1/search?query=redux'
      );
      // setStock(stockFeed.data);
      console.log(stockFeed.data);
      // console.log(stockFeed.data.json);
      let newarray = Object.values(stockFeed.data);
      console.log(newarray[1])
      console.log(Object.values(newarray[1]))
      // console.log(stock)
      // setStock(Object.values(newarray[1]));

      let stockList = Object.values(newarray[1]);
      let updatedStockList = [];
      for (let list in stockList) {
        updatedStockList.push({
          id: list,
          open: stockList[list]['1. open'],
          high: stockList[list]['2. high'],
          low: stockList[list]['3. low'],
          close: stockList[list]['4. close'],
          adjusted_close: stockList[list]['5. adjusted close'],
          volume: stockList[list]['6. volume'],
          dividend_amount: stockList[list]['7. dividend amount'],
          split_coefficient: stockList[list]['8. split coefficient'],
          // desc: dbCompletedList[list].desc
        })
      }
      setStock({list:updatedStockList});





    };
    fetchData();
  }, []);
  console.log(stock)
  return (
    <>
    {/* {stock.map((item, i) => (
      {i}
    ))} */}
    {/* {stock.map} */}
      <Container>
        {/* {stockFeed} */}
        {/* {stock.list[1]} */}
        {/* <Row>
          <Col onClick={() => setNewsCategory('business')}>business</Col>
          <Col onClick={() => setNewsCategory('entertainment')}>entertainment</Col>
          <Col onClick={() => setNewsCategory('health')}>health</Col>
          <Col onClick={() => setNewsCategory('science')}>science</Col>
          <Col onClick={() => setNewsCategory('sports')}>sports</Col>
          <Col onClick={() => setNewsCategory('technology')}>technology</Col>
        </Row> */}
        <Row>
          <Col>
            <CardColumns>
              {stock.list.map((item, i) => (
                <Card style={{}} key={i}>
                  <Card.Body>
                    <ol>
                      <li>Open: {item.open}</li>
                      <li>high: {item.high}</li>
                      <li>low: {item.low}</li>
                      <li>close: {item.close}</li>
                      <li>adjusted_close: {item.adjusted_close}</li>
                      <li>volume: {item.volume}</li>
                      <li>dividend_amount: {item.dividend_amount}</li>
                      <li>split_coefficient: {item.split_coefficient}</li>
                    </ol>
                  </Card.Body>
                </Card>
              ))}
            </CardColumns>
          </Col>
        </Row>
      </Container>
    </>
  );
}
