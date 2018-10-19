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

    doLike(photoId) {
        const token = localStorage.getItem('token')
            , data = {};

        axios.post(`https://instalura-api.herokuapp.com/api/fotos/${photoId}/like?X-AUTH-TOKEN=${token}`, data)
            .then((res) => PubSub.publish('update:liker', {photoId, liker: res.data.login}))
            .catch((err) => console.error(err));
    }

    doComment(photoId, comment) {
        if (comment) {
            const token = localStorage.getItem('token')
                , data = {texto: comment};

            axios.post(`https://instalura-api.herokuapp.com/api/fotos/${photoId}/comment?X-AUTH-TOKEN=${token}`, data)
                .then((res) => PubSub.publish('update:comment', {photoId, comment: res.data}));
        }
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
                            this.state.results.map((item, i) => <PhotoItem key={i} photo={item} doLike={this.doLike} doComment={this.doComment}/>)
                        }
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}