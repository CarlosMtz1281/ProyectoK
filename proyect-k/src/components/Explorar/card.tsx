"use-client";
import React from 'react';

interface CardProps {
    title: string;
    description: string;
    img: string;
}


export default function Card() {
    const onClick = () => {
        console.log("click");
    };

    return (
        <div className="card" >
            <div className="card-content">
                <h1>test</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, natus! Commodi, eaque doloremque praesentium natus est voluptas veniam nulla explicabo soluta reprehenderit perspiciatis inventore at accusantium maiores odit sed placeat.</p>
            </div>
        </div>
    );
}