import React from "react";
import styled from "styled-components";
import Head from 'next/head'

export class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      api_url: process.env.API_URL,
      data: "",
      notifications: {},
      notifications_by_month: []
    }
  }

  async componentDidMount() {
    // make data requests
    this.setState({data: await this.fetchData("")});
    this.setState({notifications: await this.fetchData("notifications-by-type")});
    
    // construct table array
    let notifications_by_month_data = await this.fetchData("notifications-by-month-and-type");
    let notifications_by_month_array = [];
    for (let year in notifications_by_month_data) {
      for (let m in notifications_by_month_data[year]) {
        let month = notifications_by_month_data[year][m];
        month.date = {"year": year, "month": this.monthNumberToWord(m)}
        notifications_by_month_array.unshift(month)
      }
    }
    this.setState({notifications_by_month: notifications_by_month_array});
  }

  monthNumberToWord(m) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    return(months[m-1])
  }

  async fetchData(url) {
    const fetchurl = "http://localhost:6015/" + url;
    try {
      let resp_data = await fetch(fetchurl)
        .then(response => {
          //console.log(response.text())
          if (response.ok) {
            return response.json();
          }
        }).then(data => {
          return data;
        })
      // console.log(resp_data)
      return(resp_data)
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const FlexContainer = styled.div`
      display: flex;
      gap: 17px;
      margin-top: 17px;
    `;

    const GreyBox = styled.div`
      background-color: #eee;
      width: 50%;
      padding: 1em;
      margin-bottom: 1em;
    `;

    const LargeText = styled.div`
      font-size: 90px;
    `;

    const MediumText = styled.div`
      font-size: 60px;
    `;

    const MediumStats = styled.div`
      width: 30%;
    `;

    return (
      <div id="main">
        <Head>
          <title>GC Notify Activity Dashboard</title>
        </Head>
        <h1>Activity Dashboard</h1>
        <div>GC Notify is helping a growing number of government teams keep their clients informed. The following dashboard highlights its activity since November 2019.</div>
        <FlexContainer>
          <GreyBox>
            <div><strong>Total notifications sent</strong></div>
            <LargeText>{this.state.notifications.email + this.state.notifications.sms}</LargeText>
            <div>This includes status updates, appointment reminders, and password resets sent by email and text message.</div>
          </GreyBox>
          <GreyBox>
            <div><strong>Programs and services using GC Notify</strong></div>
            <LargeText>{this.state.data.services}</LargeText>
            <div>This includes services offered by federal departments, and provinces and territories.</div>
          </GreyBox>
        </FlexContainer>
        <FlexContainer>
          <MediumStats>
            <div>Emails</div>
            <MediumText>{this.state.notifications.email}</MediumText>
          </MediumStats>
          <MediumStats>
            <div>Text Messages</div>
            <MediumText>{this.state.notifications.sms}</MediumText>
          </MediumStats>
        </FlexContainer>
        <h2>Notifications sent over time</h2>
        <table width='100%'>
          <thead>
            <tr>
              <th>Month</th>
              <th>Total notifications sent</th>
              <th>Emails sent</th>
              <th>Text Messages sent</th>
            </tr>
          </thead>
          <tbody>
            {this.state.notifications_by_month.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.date.month} {item.date.year}</td>
                  <td>{item.email + item.sms}</td>
                  <td>{item.email}</td>
                  <td>{item.sms}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
};

export default Index;