import { useEffect, useState } from "react";
import "./Game.css"

const Game = () => {

    const [line1, setLine1] = useState([null, null, null]);
    const [line2, setLine2] = useState([null, null, null]);
    const [line3, setLine3] = useState([null, null, null]);
    const [player, setPlayer] = useState(null);
    const [winner, setWinner] = useState(0);

    const resetAll = () =>{

        for(let i = 0; i < 3; i++){
            line1[i] = null
            line2[i] = null
            line3[i] = null
        }
        setPlayer(null);
        setWinner(0);

    }

    const getWinner = (win) =>{

        if(win === 1){
            setWinner(1);
        }else{
            setWinner(-1);
        }

    }

    const compareRow = () => {

        if(line1.every(item => item === 1)){
            getWinner(1);
        }
        if(line1.every(item => item === -1)){
            getWinner(-1);
        }
        if(line2.every(item => item === 1)){
            getWinner(1);
        }
        if(line2.every(item => item === -1)){
            getWinner(-1);
        }
        if(line3.every(item => item === 1)){
            getWinner(1);
        }
        if(line3.every(item => item === -1)){
            getWinner(-1);
        }

    }

    const compareColumn = () => {

        if([line1[0], line2[0], line3[0]].every(item => item === 1)){
            getWinner(1);
        }
        if([line1[0], line2[0], line3[0]].every(item => item === -1)){
            getWinner(-1);
        }
        if([line1[1], line2[1], line3[1]].every(item => item === 1)){
            getWinner(1);
        }
        if([line1[1], line2[1], line3[1]].every(item => item === -1)){
            getWinner(-1);
        }
        if([line1[2], line2[2], line3[2]].every(item => item === 1)){
            getWinner(1);
        }
        if([line1[2], line2[2], line3[2]].every(item => item === -1)){
            getWinner(-1);
        }


    }

    const compareDiagonal = () => {

        if([line1[0], line2[1], line3[2]].every(item => item === 1)){
            getWinner(1);
        }
        if([line1[0], line2[1], line3[2]].every(item => item === -1)){
            getWinner(-1);
        }
        if([line1[2], line2[1], line3[0]].every(item => item === 1)){
            getWinner(1);
        }
        if([line1[2], line2[1], line3[0]].every(item => item === -1)){
            getWinner(-1);
        }

    }

    const setValues = (index, line, value) =>{

        if(value != null || winner != 0 || player === null){
            return;
        }

        if(player){

            line[index] = 1;
            compareRow();
            compareColumn();
            compareDiagonal();

        }else{

            line[index] = -1;
            compareRow();
            compareColumn();
            compareDiagonal();

        }

        setPlayer(!player);
    
    }
    
    const getValue = (value) =>{ 
          
        if(value === null){
            return null;
        }
        
        return value > 0 ? 'X' : 'O';    
    }

    return (
        <div className="game-styles">
            <h1 className="game-label">Jogo da Velha</h1>
            {
                player === null ? 
                    <div className="choose-player">
                        <p className="choose-label">Escolha um jogador:</p>
                        <button className="btn-choose" onClick={() => {setPlayer(true)}}>X</button>
                        <button className="btn-choose" onClick={() => {setPlayer(false)}}>O</button>
                    </div> : null 
            }
            {
                winner > 0 ? 
                    <div className="winner-popup">
                        <p className="winner-label">O vencedor é o X</p>
                        <button className="btn-reset" onClick={() => {resetAll()}}>Jogar Novamente</button>
                    </div> : null || 
                winner < 0 ? 
                    <div className="winner-popup">
                        <p className="winner-label">O vencedor é o O</p>
                        <button className="btn-reset" onClick={() => {resetAll()}}>Jogar Novamente</button>
                    </div> : null ||
                [line1[0],line1[1],line1[2],line2[0],line2[1],line2[2],line3[0],line3[1],line3[2]].every(item => item != null) ?
                    <div className="winner-popup">
                        <p className="winner-label" >Empate</p>
                        <button className="btn-reset" onClick={() => {resetAll()}}>Jogar Novamente</button>
                    </div> : null
            }
            <div className="game-container">
                <div className="line">
                    {
                    line1.map((value,index) => {
                        return(
                            <div key={index} className="position">
                                <button className="btn" onClick={() => setValues(index, line1, value)}>{getValue(value)}</button>
                            </div>
                        );
                    })
                    }
                </div>
                <div className="line">
                    {
                    line2.map((value,index) => {
                        return(
                            <div key={index} className="position">
                                <button className="btn" onClick={() => setValues(index, line2, value)}>{getValue(value)}</button>
                            </div>
                        );
                    })
                    }
                </div>
                <div className="line">
                    {
                    line3.map((value,index) => {
                        return(
                            <div key={index} className="position">
                                <button className="btn" onClick={() => setValues(index, line3, value)}>{getValue(value)}</button>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
            <div className="player-time">
                <p>
                    {
                        player === null ? null : player ? 'É a vez de X jogar' : 'É a vez de O jogar'
                    }
                </p>
            </div>
        </div>
    );
  }
  
  export default Game;