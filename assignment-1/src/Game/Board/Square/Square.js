import React from 'react'
import player from '../../../assets/player.png';
import sprite from '../../../assets/sprite.png';

const Square = (props) => {
    return (
      <div className="square">
          {
            props.value!== 0? 
            <img style={{height:'30px',width:'30px'}} src={props.value === 'S'? sprite:player} />:null
        }
      </div>
    );
}

export default Square