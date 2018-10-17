import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import PubSub from 'pubsub-js';

export default class Header extends Component {

    doSearch(e) {
        e.preventDefault();

        axios.get(`https://instalura-api.herokuapp.com/api/public/fotos/${this.search.value}`)
            .then((res) => PubSub.publish('timeline', res.data));
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                </h1>

                <form className="header-busca" onSubmit={this.doSearch.bind(this)}>
                    <input type="text" name="search"
                           ref={input => this.search = input}
                           placeholder="Pesquisa" className="header-busca-campo"/>
                    <input type="submit" value="Buscar" className="header-busca-submit"/>
                </form>


                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <Link to="">
                                ♡
                                {/*                 ♥ */}
                                {/* Quem deu like nas minhas fotos */}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}