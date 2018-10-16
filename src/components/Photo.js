import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import PubSub from "pubsub-js";

class PhotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.photo.urlPerfil} alt={this.props.photo.loginUsuario}/>
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.photo.loginUsuario}`}>
                            {this.props.photo.loginUsuario}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.photo.horario}</time>
            </header>
        )
    }
}

class PhotoInfo extends Component {

    constructor() {
        super();
        this.state = {likers: []};
    }

    componentWillMount() {
        PubSub.subscribe('update:liker', (topic, data) => {
            if (this.props.photo.id === data.photoId) {
                const exists = this.state.likers.find((liker) => liker.login === data.liker);
                let newLikers = [];

                if (exists) {
                    newLikers = this.state.likers.filter((liker) => liker.login !== data.liker);
                } else {
                    newLikers = this.state.likers.concat({login: data.liker});
                }

                this.setState({likers: newLikers});
            }
        });
    }

    componentDidMount() {
        this.setState({likers: this.props.photo.likers});
    }

    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">

                    {
                        this.state.likers.map((item, i) => {
                            return (
                                <Link to={`/timeline/${item.login}`} key={i}>
                                    {item.login}
                                    <span>
                                        {(i + 1) === this.state.likers.length ? ' ' : ', '}
                                    </span>
                                </Link>
                            )
                        })
                    }

                    {this.state.likers.length > 1 ? 'curtiram' : ''}
                    {this.state.likers.length === 1 ? 'curtiu' : ''}

                </div>

                <p className="foto-info-legenda">
                    <Link to="" className="foto-info-autor">autor</Link>
                    <span> {this.props.photo.comentario}</span>
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.photo.comentarios.map((item, i) => {
                            return (
                                <li className="comentario" key={i}>
                                    <Link to={`/timeline/${item.login}`} className="foto-info-autor">{item.login}</Link>
                                    {item.texto}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

class PhotoUpdates extends Component {

    constructor() {
        super();
        this.state = {liked: false};
    }

    componentDidMount() {
        this.setState({liked: this.props.photo.likeada});
    }

    doLike(e) {
        e.preventDefault();

        const token = localStorage.getItem('token')
            , data = {};

        axios.post(`https://instalura-api.herokuapp.com/api/fotos/${this.props.photo.id}/like?X-AUTH-TOKEN=${token}`, data)
            .then((res) => {
                this.setState({liked: !this.state.liked});
                PubSub.publish('update:liker', {photoId: this.props.photo.id, liker: res.data.login});
            })
            .catch((err) => console.error(err));
    }

    render() {
        const myClasses = `fotoAtualizacoes-like ${this.state.liked ? 'fotoAtualizacoes-like-active' : ''}`;

        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.doLike.bind(this)}
                   className={myClasses}>
                    Likar
                </a>

                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..."
                           className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>
            </section>
        )
    }
}

export default class PhotoItem extends Component {
    render() {
        return (
            <div className="foto">
                <PhotoHeader photo={this.props.photo}/>
                <img alt="foto" className="foto-src" src={this.props.photo.urlFoto}/>
                <PhotoInfo photo={this.props.photo}/>
                <PhotoUpdates photo={this.props.photo}/>
            </div>
        );
    }
}