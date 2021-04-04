import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col, Card, CardColumns, Button } from 'react-bootstrap';

export default function MutualFund() {
  // const { news, setNews } = useState('news');
  const [newsCategory, setNewsCategory] = useState('business');
  // changeNewCategory = (e) => {
  //   setNewCategory(e.target);
  // }
  const [news, setNews] = useState({ articles: [] });
  // const [ur]
  useEffect(() => {
    const fetchData = async () => {
      console.log(newsCategory)
      const newsFeed = await axios({
        "method":"POST",
        "url":"https://mutual-fund-info.p.rapidapi.com/ri/v1/investment/scheme/latestNav",
        "headers":{
        "content-type":"application/json",
        "x-rapidapi-host":"mutual-fund-info.p.rapidapi.com",
        "x-rapidapi-key":"dc68dd460amsh877f5817233cd81p1d983fjsnc54f10d724f3",
        "accept":"application/json"
        },"data":{
        "schemeCodes":["100526",
        "100527"]
        }
    }).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
      setNews(newsFeed.data);
      console.log(newsFeed.data)
    };
    fetchData();
  }, [newsCategory]);
  console.log(news)
  return (
    <>
      <Container>
        <Row>
          <Col onClick={() => setNewsCategory('business')}>business</Col>
          <Col onClick={() => setNewsCategory('entertainment')}>entertainment</Col>
          <Col onClick={() => setNewsCategory('health')}>health</Col>
          <Col onClick={() => setNewsCategory('science')}>science</Col>
          <Col onClick={() => setNewsCategory('sports')}>sports</Col>
          <Col onClick={() => setNewsCategory('technology')}>technology</Col>
        </Row>
        <Row>
          <Col>
            <CardColumns>
              {news.articles.map((item, i) => (
                <Card style={{}} key={i}>
                  <Card.Img variant="top" src={item.urlToImage} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                    <p className={''} variant="blue">
                      <span className={'mr-1 small'}>{item.author}</span>
                      <span className={'small'}>{item.publishedAt}</span>
                    </p>
                    <Button variant="outline-primary" size="sm" href={item.url}>{item.source.name}</Button>
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
