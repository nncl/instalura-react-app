import React, {Component} from "react";
import PhotoItem from "./Photo";
import axios from "axios";
import PubSub from "pubsub-js";
import {ClipLoader} from 'react-spinners';
import {CSSTransitionGroup} from 'react-transition-group';

export default class Timeline extends Component {

    constructor() {
        super();
        this.state = {results: [], loading: false};
    }

    componentWillMount() {
        PubSub.subscribe('timeline', (topic, data) => this.setState({results: data}));
    }

    componentDidMount() {
        this.setState({loading: true});

        const token = localStorage.getItem('token')
            , url = 'https://instalura-api.herokuapp.com/api'
            , endpoint = this.props.slug ? `public/fotos/${this.props.slug}` : `fotos?X-AUTH-TOKEN=${token}`;

        axios.get(`${url}/${endpoint}`)
            .then((results) => this.setState({results: results.data, loading: false}))
            .catch(() => this.setState({loading: false}));
    }

    render() {
        return (
            <div>
                <div className="ca-center">
                    <ClipLoader
                        sizeUnit={"px"}
                        size={50}
                        color={'#069'}
                        loading={this.state.loading}
                    />
                </div>

                <div className="fotos container">
                    <CSSTransitionGroup
                        transitionName="timeline"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {
                            this.state.results.map((item, i) => <PhotoItem key={i} photo={item}/>)
                        }
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}