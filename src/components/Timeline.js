import React, {Component} from "react";
import PhotoItem from "./Photo";

export default class Timeline extends Component {

    constructor() {
        super();
        this.state = {results: []};
    }

    componentDidMount() {
        fetch("https://instalura-api.herokuapp.com/api/public/fotos/alots")
            .then((res) => res.json())
            .then((results) => this.setState({results}));
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.results.map((item, i) => <PhotoItem key={i} photo={item}/>)
                }
            </div>
        );
    }
}