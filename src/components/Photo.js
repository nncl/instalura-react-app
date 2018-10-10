import React, {Component} from "react";
import {Link} from "react-router-dom";

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
    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">

                    {
                        this.props.photo.likers.map((item) => {
                            return (
                                <Link to={`/timeline/${item.login}`}>
                                    {item.login},
                                </Link>
                            )
                        })
                    }

                    {this.props.photo.likers.length ? 'curtiram' : ''}

                </div>

                <p className="foto-info-legenda">
                    <Link to="" className="foto-info-autor">autor </Link>
                    {this.props.photo.comentario}
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
    render() {
        return (
            <section className="fotoAtualizacoes">
                <Link to="" className="fotoAtualizacoes-like">Likar</Link>
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
                <PhotoUpdates/>
            </div>
        );
    }
}