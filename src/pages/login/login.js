export default () => {
  const container = document.createElement('section');

  const login = `
 <section class="container">
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
  container.innerHTML = login;
  const btnlogin = container.querySelector('#signUp');
  btnlogin.addEventListener('click', () => {
    window.location.hash = '#dashboard';
  });
  return container;
};
