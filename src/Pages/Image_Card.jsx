import React from 'react'
import './Image_Card.css'

function Image_Card(props) {
    return (
        <div>
            <img src={props.image} />

            <div className="card">
                <div className="card-image">
                    <img height="200" width="350" src={props.image} />
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Image_Card
