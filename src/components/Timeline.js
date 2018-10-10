import React, {Component} from "react";
import PhotoItem from "./Photo";
import axios from "axios";

export default class Timeline extends Component {

    constructor() {
        super();
        this.state = {results: []};
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.get(`https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${token}`)
            .then((results) => this.setState({results: results.data}));
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