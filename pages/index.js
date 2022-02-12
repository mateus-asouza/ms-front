import React from "react";

import Menu from "../components/Menu";
import ProgressBar from "../components/ProgressBar"
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => (


  <div>
    <Head>
      <title>Home - Titulo</title>
      <meta name="description" content="Site de estudos react" />
      <meta name="author" content="Mateus" />
    </Head>
    <Menu />

    <div className="center-block container">

      <ProgressBar />

    </div>

  </div>
)

export default Home