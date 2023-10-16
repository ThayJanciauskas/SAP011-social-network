import {
  createPost,
  fetchPosts,
  deletePost,
  editPost,
} from '../../Firebase/firebaseStore.js';
import {
  auth,
  logOut,
  displayName,
}
  from '../../Firebase/firebaseauth.js';
import customAlert from '../../func/customAlert.js';
import customDialog from '../../func/customDialog.js';
import customEditDialog from '../../func/customEditDialog.js';

// function that houses the posts
function feed(post, feedElement) {
  const postElement = document.createElement('section');
  postElement.classList.add('post');
  postElement.setAttribute('dataPostId', post.id);
  const deleteBtn = post.uid === auth.currentUser.uid
    ? '<p class="deleteBtn" id="deleteBtn">Excluir</p>' : '';
  const editBtn = post.uid === auth.currentUser.uid
    ? '<p class="editBtn" id="editBtn">Editar</p>' : '';
  const content = `
      <section class='info'>
          <p class='name'>${post.username}</p>
          <p class='name'>${post.text}</p>
      </section>
          <section class='container-edit'>
              ${editBtn}
              ${deleteBtn}
          </section>
    `;
  postElement.innerHTML = content;

  const btnDelete = postElement.querySelector('#deleteBtn');
  if (btnDelete) {
    btnDelete.addEventListener('click', () => {
      customDialog('Quer mesmo exluir?', async () => {
        await deletePost(post.id);
        feedElement.removeChild(postElement);
      });
    });
  }

  const btnEdit = postElement.querySelector('#editBtn');
  if (btnEdit) {
    btnEdit.addEventListener('click', () => {
      customEditDialog(post.text, (newText) => {
        const postId = postElement.getAttribute('dataPostId');
        if (newText) {
          editPost(postId, newText)
            .then(() => {
              const textElement = postElement.querySelector('.text');
              textElement.textContent = newText;
              post.text = newText;
            })
            .catch(() => {
              customAlert('Ops! Deu um erro aqui. Tenta de novo! :)');
            });
        } else {
          customDialog('Opa! Ainda não é posível fazer uma publcação vazia :(');
        }
      });
    });
  }
  return postElement;
}

async function showFeed() {
  const posts = await fetchPosts();
  const feedElement = document.querySelector('#postArea');
  feedElement.container = '';
  posts.forEach((post) => {
    const postElement = feed(post, feedElement);
    feedElement.appendChild(postElement);
  });
}

export default () => {
  const container = document.createElement('section');
  container.classList.add('dashContainer');

  const dashboard = `
  <section class="all">
    <nav class="menu">
     <h2> Bon Voyage.</h2>
     <img src="logo-bon-voyage.png" id="logoo">
     <p id="welcome"> Olá, <span id="user"></span> :) </p>
     <button class="logout" id="logout">Logout</button>
    </nav>
  
    <main class="feed">
     <section class="postArea" id="postArea">
     <textarea id="textArea" class="textArea" rows="4" cols="50"></textarea>
     <button class="send" id="send">Enviar</button>
     </section>
    </main>
  </section>
  `;
  container.innerHTML = dashboard;

  container.querySelector('#user').innerHTML = displayName();

  const textArea = container.querySelector('#textArea');
  const send = container.querySelector('#send');
  send.addEventListener('click', () => {
    if (textArea.value !== '') {
      createPost(textArea.value, auth.currentUser.uid, auth.currentUser.displayName)
        .then(() => {
          customAlert('Seu post foi publicado com sucesso');
          textArea.value = '';
          showFeed();
        })
        .catch(() => {
          customAlert('Erro ao publicar post');
        });
    } else {
      customDialog('Você não pode publicar um post vazio.');
    }
  });

  showFeed();

  const buttonLogOut = container.querySelector('#logout');
  const handleLogout = () => {
    customDialog('Deseja realmente sair?', () => {
      logOut()
        .then(() => {
          window.location.hash = '#login';
        })
        .catch(() => {
          customAlert('Erro ao sair. Tente novamente.');
        });
    });
  };
  buttonLogOut.addEventListener('click', handleLogout);
  return container;
};
