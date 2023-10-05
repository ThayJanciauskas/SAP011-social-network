export default () => {
  const container = document.createElement('section');
  const dashboard = `
<nav class="menu">
     <h2> Bon Voyage.</h2>
     <img src="logo-bon-voyage.png" id="logoo">
     <p id="welcome"> Olá, </p>
     <button class="logout">Logout</button>
</nav>
  
<main class="feed">
     <section class="postArea">
     <textarea id="textArea" class="textArea" rows="4" cols="50"></textarea>
     <button class="send">Enviar</button>
     </section>
</main>
`;
  container.innerHTML = dashboard;

  return container;
};
