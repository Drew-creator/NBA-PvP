import React, { Component } from 'react';
import "./PlayerForm.css";
import axios from 'axios';

class PlayerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: "",
            player2: "",
            year: "2020",
            filteredPlayersOne: [],
            filteredPlayersTwo: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // function to listen to form input, setting state each time there is a change
    handleChange(evt) {
        this.setState({ 
            [evt.target.name]: evt.target.value 
        });
        this.getPlayer();
    }

    // pass data back up to PlayerList component
    handleSubmit(evt) {
        evt.preventDefault();
        this.props.add(this.state.player1, this.state.player2, this.state.year)
    }

    // arrayEquals(a, b) {
    //     return Array.isArray(a) &&
    //     Array.isArray(b) &&
    //     a.length === b.length &&
    //     a.every((val, index) => val === b[index]);     
    // }

    async getPlayer() {
        if(this.state.player1.length > 1 && this.state.player1.length < 4) {
            const res1 = await axios.get(
                `https://www.balldontlie.io/api/v1/players?per_page=100&search=${this.state.player1}`
            );
            let playerObjArrOne = res1.data.data;
            let playerOneInfo;
            let playerOneNameArr = [];
            
            playerObjArrOne.map((player) => {
                playerOneInfo = `${player["first_name"]} ${player["last_name"]}`;
                playerOneNameArr.push(playerOneInfo);
            })  
            this.setState({ filteredPlayersOne: playerOneNameArr})
            console.log(this.state.filteredPlayersOne)
        }       
             
        if(this.state.player2.length > 1 && this.state.player2.length < 4) {
            const res2 = await axios.get(
                `https://www.balldontlie.io/api/v1/players?per_page=100&search=${this.state.player2}`
            );
            let playerObjArrTwo = res2.data.data;
            let playerTwoInfo;
            let playerTwoNameArr = [];

            playerObjArrTwo.map((player) => {
                playerTwoInfo = `${player["first_name"]} ${player["last_name"]}`;
                playerTwoNameArr.push(playerTwoInfo);
            })
            this.setState({ filteredPlayersTwo: playerTwoNameArr })
            console.log(this.state.filteredPlayersTwo)
        }    
    }

    render() {
        const yearArr = [];
        let year = 2020; // default year

        // fill yearArr with values from 1979-2020
        for(let i = 0; i < 42; i++) {  
            yearArr.push(year.toString())
            year--
        }
        
        // map through yearArr and render the years with an added year at the end 
        // "year - next year"
        // "2010 - 2011"
        const renderYear =  yearArr.map((year) => {
            return <option value={year}>{year}-{(parseInt(year) + 1).toString()}</option>
        })

        const renderOptionsOne = this.state.filteredPlayersOne.map((player) => {
            return <option value={player}>{player}</option>
        })

        const renderOptionsTwo = this.state.filteredPlayersTwo.map((player) => {
            return <option value={player}>{player}</option>
        })
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="PlayerForm-form">
                    <select
                        name="year"
                        id="year"
                        value={this.state.year}
                        onChange={this.handleChange}
                        className="PlayerForm-dropdown1"
                    >
                        {renderYear}
                    </select>
                    <div class="help-tip">
                        <p>
                            This app compares the stats between two NBA players. 
                            Each player's full name goes in each input box, and both players
                            must have played in the year selected.
                        </p>
                    </div>
                    <br></br>
                    <i className="fas fa-user-plus" id="PlayerForm-p1-icon"></i>
                    <input 
                        name="player1"
                        id="player1"
                        value={this.state.player1}
                        onChange={this.handleChange}
                        className="PlayerForm-input"
                        placeholder="Ex. Lebron James"
                        list="first"
                        type="text"
                        autoComplete="off"
                    >
                    </input>
                    <datalist id="first">
                        {renderOptionsOne}
                    </datalist>
                    <input
                        name="player2"
                        id="player2"
                        value={this.state.player2}
                        onChange={this.handleChange}
                        className="PlayerForm-input"
                        placeholder="Ex. Stephen Curry"
                        list="second"
                        type="text"
                        autoComplete="off"    
                    >
                    </input>
                    <datalist id="second">
                        {renderOptionsTwo}
                    </datalist>
                    <i class="fas fa-user-plus" id="PlayerForm-p2-icon"></i>
                    <button className="PlayerForm-submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PlayerForm;