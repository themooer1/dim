import React, { Component } from "react";
import Card from "./Card.jsx";
import LazyImage from "./helpers/LazyImage.jsx";
import ProgressBar from "./progress-bar.jsx";
import "./main.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { usePalette } from 'react-palette';

library.add(faArrowAltCircleRight);

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            bannerData: undefined,
        };

        fetch(`http://86.21.150.167:8000/api/v1/library/1/media`)
            .then((resp) => resp.json())
            .then((json) => {
                let cards = json.map(item => <Card key={item.id} data={item} src={item.poster_path}/>);
                this.setState({
                    cards: cards
                });
            });

        //        this.bannerCallback = this.bannerCallback.bind(this);
    }

    componentDidMount() {
        this.fetchBanner()
    }

    async fetchBanner() {
        const url = "/banner1.jpg";
        const resp = await fetch(url);
        if (!resp.headers.get("content-type") === "image/jpeg") {
            throw new Error("Not an image");
        }
        const bannerData = URL.createObjectURL(await resp.blob());
        this.setState({ bannerData });
    }

    render() {
        const { cards, bannerData } = this.state;
        return (
            <main>
                <section className="banner">
                    <LazyImage alt="banner" data={bannerData}/>
                    <div className="info">
                        <h1>THE 100</h1>
                        <div className="desc">
                            <h5>PICK UP WHERE YOU LEFT OFF</h5>
                            <p>
                                Set ninety-seven years after a nuclear war
                                has destroyed civilization, when a spaceship
                                housing humanity's lone survivors sends one
                                hundred juvenile delinquents back to Earth,
                                in hopes of possibly re-populating the planet.
                            </p>
                        </div>
                        <a href="http://example.com/">PLAY<FontAwesomeIcon icon="arrow-alt-circle-right"/></a>
                    </div>
                    <ProgressBar id="1"/>
                </section>
                <section className="libraries">
                    <div className="recommended">
                        <h1>RECOMMENDED</h1>
                        <div className="cards">
                            { cards }
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

export default Main;
