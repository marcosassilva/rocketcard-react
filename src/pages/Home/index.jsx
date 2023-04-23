// Importação de hooks e do React em si
import React, { useState, useEffect } from "react";

//Importação dos estilos específicos desta página.
import "./styles.css";

// Função que renderiza a página "Home", deve haver obrigatoriamente um retorno de código HTML com APENAS UM elemento pai.
export function Home() {
  // UseState para receber o nome do usuário e os dados da API.

  const [username, setUsername] = useState("");
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    followers: "",
    following: "",
    public_repos: "",
    html_url: "",
    location: "",
  });

  /*   function go() {
    document.querySelector(".card-container").setAttribute("hidden", "");
    document.querySelector(".fail").setAttribute("hidden", "");
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((jsonData) => {
        setUser({
          name: jsonData.login,
          avatar: jsonData.avatar_url,
          followers: jsonData.followers,
          following: jsonData.following,
          public_repos: jsonData.public_repos,
          html_url: jsonData.html_url,
          location: jsonData.location,
        });
        if (user.name == "" || user.name == undefined) {
          console.log("fail");
          document.querySelector(".fail").innerHTML = "Usuário não encontrado!";
          document.querySelector(".fail").removeAttribute("hidden");
        } else {
          console.log("success");
          document.querySelector(".card-container").removeAttribute("hidden");
        }
      });
  } */

  // Consumir API do Github e armazenar dados necessários no ojeto user.

  async function renderCard() {
    document.querySelector(".card-container").setAttribute("hidden", "");
    document.querySelector(".fail").setAttribute("hidden", "");
    document.querySelector(".user-url").setAttribute("hidden", "");

    const jsonData = await handleUsername().catch(console.error);

    if (jsonData.message == "Not Found") {
      console.log("fail");
      document.querySelector(".fail").innerHTML = "Usuário não encontrado!";
      document.querySelector(".fail").removeAttribute("hidden");
    } else {
      console.log("success");
      setUser({
        name: jsonData.login,
        avatar: jsonData.avatar_url,
        followers: jsonData.followers,
        following: jsonData.following,
        public_repos: jsonData.public_repos,
        html_url: jsonData.html_url,
        location: jsonData.location,
      });
      document.querySelector(".card-container").removeAttribute("hidden");
      document.querySelector(".user-url").removeAttribute("hidden");
    }

    console.log(jsonData);

    /*     setUser({
      name: jsonData.login,
      avatar: jsonData.avatar_url,
      followers: jsonData.followers,
      following: jsonData.following,
      public_repos: jsonData.public_repos,
      html_url: jsonData.html_url,
      location: jsonData.location,
    }); */

    /*     if (user.name == "" || user.name == undefined) {
      console.log("fail");
      document.querySelector(".fail").innerHTML = "Usuário não encontrado!";
      document.querySelector(".fail").removeAttribute("hidden");
    } else {
      console.log("success");
      document.querySelector(".card-container").removeAttribute("hidden");
    } */
  }

  /*   async function handleUsername() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    setUser(
      await response.json().then({
        name: response.login,
        avatar: response.avatar_url,
        followers: response.followers,
        following: response.following,
        public_repos: response.public_repos,
        html_url: response.html_url,
        location: response.location,
      })
    );
  } */
  async function handleUsername() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const jsonData = await response.json();
    return jsonData;
  }

  function renderBackground() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector(
      ".card-container"
    ).style.borderColor = `#${randomColor}`;
  }

  // Retorno dos elementos da página.
  return (
    <div className="container">
      <div className="info-container">
        <div>Compartilhe seu #rocketcard</div>
        <div className="fail"></div>
        <div hidden className="card-container">
          <header>
            <img src="logo-ellipse.svg" alt="" />
            {user.name}
          </header>
          <img className="photo" src={user.avatar} alt="" />
          <div className="info">
            <div>
              <img src="following.svg" alt="" />
              <span>{user.followers} Seguidores</span>
            </div>
            <div>
              <img src="followers.svg" alt="" />
              <span>{user.following} Seguindo</span>
            </div>
            <div>
              <img src="repository.svg" alt="" />
              <span>{user.public_repos} Repositórios</span>
            </div>
            <div>
              <img src="location.svg" alt="" />
              <span>{user.location}</span>
            </div>
          </div>
          <footer>
            <img src="logo.svg" alt="" />
            ROCKETCARD
          </footer>
        </div>
      </div>
      <div className="user-input-container">
        <p>Digite seu usuário:</p>
        <input
          id="user-input"
          type="text"
          placeholder="Digite aqui..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button id="user-search" onClick={renderCard}>
          Buscar!
        </button>
        <button
          hidden
          className="user-url"
          id="user-background"
          onClick={renderBackground}
        >
          Gerar Background
        </button>
        <form
          hidden
          className="user-url"
          action={user.html_url}
          method="get"
          target="_blank"
        >
          <button id="user-profile" type="submit">
            Acessar perfil no Github
          </button>
        </form>
        <div>
          <a className="user-url" hidden href={user.html_url}>
            Acesse aqui seu perfil no GitHub!
          </a>
        </div>
      </div>
    </div>
  );
}
