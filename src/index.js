// import { onAuthStateChanged } from 'firebase/auth';
import login from './pages/login/login.js';
import dashboard from './pages/dashboard/dashboard.js';
import registerContainer from './pages/login/newuser.js';
// import { auth } from './Firebase/firebaseauth.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '#login':
        main.appendChild(login());
        break;

      case '#dashboard':
        main.appendChild(dashboard());
        break;

      case '#register':
        main.appendChild(registerContainer());
        break;

      default:
        main.appendChild(dashboard());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login());
  init();
});
