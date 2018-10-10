import React, {Component} from "react";
import PhotoItem from "./Photo";
import axios from "axios";

export default class Timeline extends Component {

    constructor() {
        super();
        this.state = {results: []};
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
            , url = 'https://instalura-api.herokuapp.com/api'
            , endpoint = this.props.slug ? `public/fotos/${this.props.slug}` : `fotos?X-AUTH-TOKEN=${token}`;

        axios.get(`${url}/${endpoint}`)
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