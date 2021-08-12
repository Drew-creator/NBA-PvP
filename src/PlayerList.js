import React, { Component } from 'react';
import PlayerForm from './PlayerForm';
import './PlayerList.css';
import axios from 'axios';
import BarChart from './BarChart';
import RadarChart from './RadarChart';
import PolarChart from './PolarChart';

const API_URL = "https://www.balldontlie.io/api/v1/";
const arr = ['pts', 'reb', 'ast', 'stl', 'blk'];
const shootingSplit = ['fg_pct', 'fg3_pct', 'ft_pct'];
const additionalStats = ['games_played', 'min','oreb', 'dreb', 'turnover'];
const labels = ['PPG', 'REB', 'AST', 'STL', 'BLK'];
const additionalLabels = ['GAMES PLAYED', 'MIN', 'OREB', 'DREB', 'TURNOVER'];

class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: "" ,
            player2: "" ,
            id1: "",
            id2: "",
            p1Name: "",
            p2Name: "",
            year: "2020",
            playerOneStats: [],
            playerTwoStats: [],
            playerOneAdditionalStats: [],
            playerTwoAdditionalStats: [],
            playerOneShootingSplit: [],
            playerTwoShootingSplit: [],
            loaded: true,
            dataLoaded: false,
            continue: false,
            moreStats: false
        }
        this.addPlayer = this.addPlayer.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.otherStats = this.otherStats.bind(this);
    }
    addPlayer(p1, p2, year) {
        this.setState({ 
            player1: p1, 
            player2: p2, 
            year: year, 
            loaded: false, 
            dataLoaded: true
        });

        this.getPlayers();
    }
    
    //initial request to recieve player name and ID 
    async getPlayers() {
        try {
            const initialCall = await axios.get(
                `${API_URL}players?search`
            ); //API requires an initial call in order for correct values to be retrieved
            const playerOneRes = await axios.get(
                `${API_URL}players?search=${this.state.player1}`
            );
            const playerTwoRes = await axios.get(
                `${API_URL}players?search=${this.state.player2}`
            );
            const P1_ID = playerOneRes.data.data[0].id;
            const P2_ID = playerTwoRes.data.data[0].id;
            const P1_NAME = playerOneRes.data.data[0].first_name;
            const P2_NAME = playerTwoRes.data.data[0].first_name;
            this.setState({ id1: P1_ID, id2: P2_ID, p1Name: P1_NAME, p2Name: P2_NAME });
            this.getStats();
        }
        catch(e) {
            alert(e);
        }
    }

    // request stats after obtaining player ID
    async getStats(){
        try{
            const res1 = await axios.get(
                `${API_URL}season_averages?season=${this.state.year}
                &player_ids[]=${this.state.id1}`
            );

            const res2 = await axios.get(
                `${API_URL}season_averages?season=${this.state.year}
                &player_ids[]=${this.state.id2}`
            );
            const playerOneStatsArr = [];
            const playerTwoStatsArr = [];
            const playerOneShootingSplitArr = [];
            const playerTwoShootingSplitArr = [];
            const playerOneAdditionalStatsArr = [];
            const playerTwoAdditionalStatsArr = [];

            arr.map((stat) => {
                playerOneStatsArr.push(res1.data.data[0][stat]);
                playerTwoStatsArr.push(res2.data.data[0][stat]);
            })

            shootingSplit.map((stat) => {
                playerOneShootingSplitArr.push(res1.data.data[0][stat]);
                playerTwoShootingSplitArr.push(res2.data.data[0][stat]);
            })

            additionalStats.map((stat) => {
                playerOneAdditionalStatsArr.push(res1.data.data[0][stat]);
                playerTwoAdditionalStatsArr.push(res2.data.data[0][stat]);
            })

            let parseMinsOne = parseInt(playerOneAdditionalStatsArr[1])
            let parseMinsTwo = parseInt(playerTwoAdditionalStatsArr[1])

            playerOneAdditionalStatsArr[1] = parseMinsOne;
            playerTwoAdditionalStatsArr[1] = parseMinsTwo;

            console.log(playerOneAdditionalStatsArr)

            this.setState({ 
                playerOneStats: playerOneStatsArr, 
                playerTwoStats: playerTwoStatsArr ,
                playerOneShootingSplit: playerOneShootingSplitArr,
                playerTwoShootingSplit: playerTwoShootingSplitArr, 
                playerOneAdditionalStats: playerOneAdditionalStatsArr,
                playerTwoAdditionalStats: playerTwoAdditionalStatsArr,
                loaded: true
            })
        }
        catch(e) {
            alert(`Player(s) not found. Please refresh the page`)
        }   
    }

    // function to render stats based on dataLoaded
    renderStats() {
        const shortYear = "'" + this.state.year.slice(2);
        if(!this.state.moreStats) {
            return (
                <div className="PlayerList-stats">
                    <h2>
                            <span className="PlayerList-p1-stat">
                                {this.state.player1}
                            </span> vs <span className="PlayerList-p2-stat">
                                {this.state.player2}
                            </span>
                    </h2>
                    <h3>Counting Stats Per Game {shortYear} Season</h3>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneStats[0]} 
                        </span> PTS <span className="PlayerList-p2-stat">
                            {this.state.playerTwoStats[0]}
                        </span>
                    </h1>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneStats[1]}
                        </span> REB <span className="PlayerList-p2-stat">
                            {this.state.playerTwoStats[1]}
                        </span>
                    </h1>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneStats[2]}
                        </span> AST <span className="PlayerList-p2-stat">
                            {this.state.playerTwoStats[2]}
                        </span>
                    </h1>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneStats[3]}
                        </span> STL <span className="PlayerList-p2-stat">
                            {this.state.playerTwoStats[3]}
                        </span>
                    </h1>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneStats[4]}
                        </span> BLK <span className="PlayerList-p2-stat">
                            {this.state.playerTwoStats[4]}
                        </span>
                    </h1>
                </div>
            )   
        }
        else {
            return (
                <div className="PlayerList-stats">
                    <h2>
                            <span className="PlayerList-p1-stat">
                                {this.state.player1}
                            </span> vs <span className="PlayerList-p2-stat">
                                {this.state.player2}
                            </span>
                    </h2>
                    <h3>Counting Stats Per Game {shortYear} Season</h3>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneAdditionalStats[0]} 
                        </span> GAMES PLAYED <span className="PlayerList-p2-stat">
                            {this.state.playerTwoAdditionalStats[0]}
                        </span>
                    </h1>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneAdditionalStats[1]}
                        </span> MIN <span className="PlayerList-p2-stat">
                            {this.state.playerTwoAdditionalStats[1]}
                        </span>
                    </h1>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneAdditionalStats[2]}
                        </span> OREB <span className="PlayerList-p2-stat">
                            {this.state.playerTwoAdditionalStats[2]}
                        </span>
                    </h1>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneAdditionalStats[3]}
                        </span> DREB <span className="PlayerList-p2-stat">
                            {this.state.playerTwoAdditionalStats[3]}
                        </span>
                    </h1>
                    <h1>
                        <span className="PlayerList-p1-stat">
                            {this.state.playerOneAdditionalStats[4]}
                        </span> TURNOVER <span className="PlayerList-p2-stat">
                            {this.state.playerTwoAdditionalStats[4]}
                        </span>
                    </h1>
                </div>
            )  
        }
        
    }
    nextPage() {
        this.setState({ continue: true });
    }
    otherStats() {
        if(!this.state.moreStats) this.setState({ moreStats: true });
        else if(this.state.moreStats) this.setState({ moreStats: false });
    }
    render() {
        if (!this.state.loaded) {
            return(
                <div className="PlayerList-spinner">
                    <h1>Loading...</h1>
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            )
        }
        if(!this.state.continue) {
            return (
                <div>
                    <i className="fas fa-info-circle"></i>
                    <p className="PlayerList-intro">
                        This app compares the season averages between two NBA players. 
                        Each player's full name goes in each input, and both players
                        must have played in the year selected.
                    </p>
                    <div className="PlayerList-card">
                        <div className="PlayerList-card-content">
                            <h1>
                                NBA 
                                <span className="PlayerList-first-P"> P
                                </span>
                                    V
                                <span className="PlayerList-second-P">
                                    P
                                </span>
                            </h1>
                            <p>Comparator App, created with React and Chart.js</p>
                            <div className="PlayerList-card-button">
                                <button onClick={this.nextPage}>Continue</button>
                            </div>
                        </div>
                    </div>  
                </div>
              
            )
        }
        // pass in player data as props into BarChart component
        // player data should be stored in an array
        return(
            <div className="PlayerList">
                <h1 className="PlayerList-title">
                    NBA 
                    <span className="PlayerList-first-P"> P
                    </span>
                        V
                    <span className="PlayerList-second-P">
                        P
                    </span> 
                    <i className="fas fa-basketball-ball"></i>
                </h1>
                <PlayerForm add={this.addPlayer}/>
                {this.state.dataLoaded && 
                    <div>
                        {this.renderStats()} 
                    </div>
                }
                
                {this.state.dataLoaded &&
                    <div>
                        <button className="PlayerList-more"onClick={this.otherStats}>More Stats</button>
                        <BarChart 
                            playerOneStat={
                                !this.state.moreStats 
                                ? this.state.playerOneStats 
                                : this.state.playerOneAdditionalStats
                            }
                            playerOneName={this.state.p1Name}
                            playerTwoStat={
                                !this.state.moreStats 
                                ? this.state.playerTwoStats 
                                : this.state.playerTwoAdditionalStats
                            }
                            playerTwoName={this.state.p2Name}
                            labels={!this.state.moreStats ? labels : additionalLabels}
                            key={
                                !this.state.moreStats 
                                ? this.state.playerOneStats 
                                : this.state.playerOneAdditionalStats
                            }
                        />
                        <hr></hr> 
                    </div>                   
                }
                {this.state.dataLoaded &&
                    <div>
                        <RadarChart 
                            playerOneStat={this.state.playerOneStats}
                            playerOneName={this.state.p1Name}
                            playerTwoStat={this.state.playerTwoStats}
                            playerTwoName={this.state.p2Name}
                            labels={labels}
                        />
                        {/* <hr></hr> */}
                    </div>    
                }
                {/* {this.state.dataLoaded && 
                    <PolarChart 
                        playerStat={this.state.playerOneStats}
                        playerName={this.state.p1Name}
                        labels={labels}
                    />
                }
                {this.state.dataLoaded && 
                    <PolarChart 
                        playerStat={this.state.playerTwoStats}
                        playerName={this.state.p2Name}
                        labels={labels}
                    />
                } */}
                {this.state.dataLoaded &&
                    <div>
                        <hr></hr>
                       <BarChart 
                            playerOneStat={this.state.playerOneShootingSplit}
                            playerOneName={this.state.p1Name}
                            playerTwoStat={this.state.playerTwoShootingSplit}
                            playerTwoName={this.state.p2Name}
                            labels={['FG%', '3PT%', 'FT%']}
                        />
                        <div className="PlayerList-stats">
                            <h1><span className="PlayerList-p1-stat">{this.state.playerOneShootingSplit[0]}</span>  FG%  <span className="PlayerList-p2-stat">{this.state.playerTwoShootingSplit[0]}</span></h1>
                            <h1><span className="PlayerList-p1-stat">{this.state.playerOneShootingSplit[1]}</span>  3PT%  <span className="PlayerList-p2-stat">{this.state.playerTwoShootingSplit[1]}</span></h1>
                            <h1><span className="PlayerList-p1-stat">{this.state.playerOneShootingSplit[2]}</span>  FT%  <span className="PlayerList-p2-stat">{this.state.playerTwoShootingSplit[2]}</span></h1>
                        </div>    
                    </div>   
                }   
            </div>
        )
    }
}

export default PlayerList;