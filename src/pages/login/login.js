import { login } from '../../Firebase/firebaseauth.js';

export default () => {
  const container = document.createElement('section');

  const templateLogin = `
    <section class="container" id="bonVoyage">
      <section class="description"> 
        <img src="logo-bon-voyage.png" id="logo">
        <p class="phrase">Lugares Incríveis.<br>
        Experiências Inexploradas.
        </p>
        <h1>Bon Voyage.</h1>
        <p class="title">Sua rede social de viagens</p>
      </section>

      <section class="login">
        <label for="email">E-mail:</label>
        <input type="text" id="email" name="E-mail">
        <label for="password">Senha:</label>
        <input type="password" id="password" name="Senha">
        <button id="signUp">Entrar</button>
        <button id="register">Criar uma Conta</button>
      </section>
    </section>
  `;
  container.innerHTML = templateLogin;

  const btnlogin = container.querySelector('#signUp');
  btnlogin.addEventListener('click', () => {
    const email = container.querySelector('#email').value;
    const senha = container.querySelector('#password').value;

    login(email, senha)
      .then(() => {
        window.location.hash = '#dashboard';
      })
      .catch(() => {
        // Criando um elemento para o erro
        const errorElement = document.createElement('section');
        errorElement.id = 'error';
        errorElement.innerHTML = `
          <p> Erro ao Logar</p>
        `;

        // Adicionando o elemento de erro ao container
        container.appendChild(errorElement);
      });
  });

  return container;
};
