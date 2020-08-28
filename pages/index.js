import React from "react";
import styled from "styled-components";
import Head from "next/head";

export class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api_url: process.env.API_URL,
      data: "",
      notifications: {},
    };
  }

  async componentDidMount() {
    // make data requests
    this.setState({ data: await this.fetchData("") });
    this.setState({
      notifications: await this.fetchData("notifications-by-type"),
    });
  }

  async fetchData(url) {
    const fetchurl = process.env.STATS_API_URL + url;
    try {
      let resp_data = await fetch(fetchurl)
        .then((response) => {
          //console.log(response.text())
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          return data;
        });
      console.log(resp_data);
      return resp_data;
    } catch (err) {
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
        <Header>Notifications by Type:</Header>
        <div>
          <div>Emails sent: {this.state.notifications.email}</div>
          <div>SMS sent: {this.state.notifications.sms}</div>
        </div>
      </div>
    );
  }
}

export default Index;
