import React from 'react';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <header className="top">
                <h1>
                    {this.props.titulo}
                </h1>
            </header>
        )
    }

}
