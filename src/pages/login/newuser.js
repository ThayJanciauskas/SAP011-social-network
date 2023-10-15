import { newUser } from '../../Firebase/firebaseauth.js';
import { userData } from '../../Firebase/firebaseStore.js';
import customAlert from '../../func/customAlert.js';

export default () => {
  const registerContainer = document.createElement('section');
  registerContainer.classList.add('registerSection');

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

    <section class="register">

    <label for="Username">Nome</label>
      <input type="text" id="username" name="Nome">
      <span class='error' id='nameError'></span>

      <label for="email">E-mail:</label>
      <input type="text" id="emailR" name="E-mail">
      <span class='error' id='emailError'></span>

      <label for="password">Senha:</label>
      <input type="password" id="passwordR" name="Senha">
      <span class='error' id='passwordError'></span>

      <button id="creat" type="creat">Criar uma Conta</button>
      <button id="backSignup">Entrar</button>
    </section>
  </section>
  `;
  registerContainer.innerHTML = registerTemplate;

  const goLogin = registerContainer.querySelector('#backSignup');
  goLogin.addEventListener('click', () => {
    window.location.hash = '#login';
  });

  const goRegister = registerContainer.querySelector('.container');
  goRegister.addEventListener('#creat', (event) => {
    event.preventDefault();

    const name = registerContainer.querySelector('#username');
    const errorName = registerContainer.querySelector('#nameError');
    const email = registerContainer.querySelector('#emailR');
    const errorEmail = registerContainer.querySelector('#emailError');
    const password = registerContainer.querySelector('#passwordR');
    const errorPassword = registerContainer.querySelector('passwordError');

    name.classList.remove('input-error');
    errorName.innerHTML = '';
    email.classList.remove('input-error');
    errorEmail.innerHTML = '';

    if (name.value === '' || email.value === '' || password.value === '') {
      if (name.value === '') {
        name.classList.add('input-error');
        errorName.innerHTML = 'Preencha o campo corretamente';
      }

      if (email.value === '') {
        email.classList.add('input-error');
        errorEmail.innerHTML = 'Preencha o campo corretamente';
      }
    } else {
      newUser(
        name.value,
        email.value,
        password.value,
      )
        .then(() => userData(
          name.value,
          email.value,
          password.value,
        ))
        .then(() => {
          customAlert('Cadastro realizado com sucesso');
          window.location.hash = '#dashboard';
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              email.classList.add('input-error');
              errorEmail.innerHTML = 'E-mail já cadastrado';
              break;

            case 'auth/missing-email':
              email.classList.add('input-error');
              errorEmail.innerHTML = 'Campo obrigatório';
              break;

            case 'auth/invalid-email':
              email.classList.add('input-error');
              errorEmail.innerHTML = 'E-mail inválido';
              break;

            case 'auth/missing-password':
              password.classList.add('input-error');
              errorPassword.innerHTML = 'Campo obrigatório';
              break;

            case 'auth/weak-password':
              password.classList.add('input-error');
              errorPassword.innerHTML = 'Digite uma senha com 6 caracteres no mínimo';
              break;

            default:
              errorPassword.innerHTML = `Erro ao cadastrar: ${error.code}`;
          }
        });
    }
  });
  return registerContainer;
};
