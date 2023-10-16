import { newUser } from '../../Firebase/firebaseauth.js';

export default () => {
  const registerContainer = document.createElement('section');

  const registerTemplate = `
    <section class="container" id="bonVoyage">
    <section class="description"> 
      <img src="logo-bon-voyage.png" id="logo">
      <p class="phrase">Lugares Incríveis.<br>
      Experiências Inexploradas.
      </p>
      <h1>Bon Voyage.</h1>
      <p class="title">Sua rede social de viagens</p>
    </section>

    <form class="register">

      <label for="name">Nome:</label>
      <input type="text" id="name" placeholder="Este nome aparecerá no seu feed">

      <label for="email">E-mail:</label>
      <input type="email" id="emailR" name="E-mail" placeholder="Digite seu e-mail">

      <label for="password">Senha:</label>
      <input type="password" id="passwordR" name="Senha" placeholder="Crie uma Senha">

      <input id="submitbtn" type="submit" value="Criar uma conta" class="btn"/>
      <button id="backSignup">Entrar</button>
    </form>
  </section>
  `;
  registerContainer.innerHTML = registerTemplate;

  const submitBtn = registerContainer.querySelector('#submitbtn');
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const name = registerContainer.querySelector('#name').value;
    const email = registerContainer.querySelector('#emailR').value;
    const password = registerContainer.querySelector('#passwordR').value;
    newUser(name, email, password)
      .then(() => {
        window.location.hash = '#dashboard';
      })
      .catch((error) => {
        console.log(error);
        alert('Erro ao cadastrar usuário!');
      });
  });
  return registerContainer;
};
