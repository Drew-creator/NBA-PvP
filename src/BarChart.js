import React, { Component } from 'react';
import './BarChart.css';
import { Bar } from 'react-chartjs-3';

class BarChart extends Component {
    render() {
        return (
                <div className="BarChart">
                    <Bar
                        data={{
                            labels: this.props.labels,
                            datasets: [
                                {
                                    label: this.props.playerOneName,
                                    data: this.props.playerOneStat,
                                    backgroundColor: [
                                        'blue',
                                        'blue',
                                        'blue',
                                        'blue',
                                        'blue',
                                        'blue'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                },
                                {
                                    label: this.props.playerTwoName,
                                    data: this.props.playerTwoStat,
                                    backgroundColor: [
                                        'red',
                                        'red',
                                        'red',
                                        'red',
                                        'red',
                                        'red'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                }
                            ]
                        }} 
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio: false,
                        }}
                        borderColor={{
                            color: 'white'
                        }}
                    />  
                </div>
                
            )
    }
}

export default BarChart;