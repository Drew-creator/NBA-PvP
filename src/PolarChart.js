import React, { Component } from 'react';
import { Polar } from 'react-chartjs-3';
import './PolarChart.css';

class PolarChart extends Component {
    render() {
        return(
            <div className="PolarChart">
                <Polar
                    data={{
                        labels: this.props.labels,
                        datasets: [
                            {
                                label: this.props.playerName,
                                data: this.props.playerStat,
                                backgroundColor: [
                                    'red',
                                    'green',
                                    'blue',
                                    'yellow',
                                    'orange'
                                ]
                            }
                        ]
                    }}
                />
            </div>
        )
    }
}

export default PolarChart;