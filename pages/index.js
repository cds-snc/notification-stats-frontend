import React from "react";
import styled from "styled-components";
import Head from 'next/head'

export class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      api_url: process.env.API_URL,
      data: "",
    }
  }

  async componentDidMount() {
    // request initial data
    const fetchurl = "http://localhost:6015/";
    try {
      await fetch(fetchurl)
        .then(response => {
          //console.log(response.text())
          if (response.ok) {
            return response.json();
          }
        }).then(data => {
          console.log(data)
          this.setState({data: data})
        })
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const Header = styled.h1`
      font-family: sans-serif;
    `;

    return (
      <div>
        <Head>
          <title>Notification Metrics Dashboard</title>
        </Head>
        <Header>Notification Metrics Dashboard</Header>
        <div>
          <div>Notifications sent: {this.state.data.notifications}</div>
          <div>Services: {this.state.data.services}</div>
        </div>
      </div>
    )
  }
};

export default Index;