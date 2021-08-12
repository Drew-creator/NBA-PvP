import React, { Component } from 'react';
import { Radar } from 'react-chartjs-3';
import './RadarChart.css';

class RadarChart extends Component {
    render() {
        return (
            <div className="RadarChart">
                <Radar 
                    data={{
                        labels: this.props.labels,
                        datasets: [
                            {
                                label: this.props.playerOneName,
                                data: this.props.playerOneStat,
                                fill: true,
                                backgroundColor: 'blue',
                                pointBackgroundColor: 'rgb(255, 99, 132)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgb(255, 99, 132)'
                            },
                            {
                                label: this.props.playerTwoName,
                                data: this.props.playerTwoStat,
                                fill: true,
                                backgroundColor: 'red',                              
                                pointBackgroundColor: 'rgb(54, 162, 235)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgb(54, 162, 235)'
                            }
                        ]
                    }}
                />

            </div>
        )
    }
}

export default RadarChart;

