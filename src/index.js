import login from './pages/login/login.js';
import dashboard from './pages/dashboard/dashboard.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case ' ':
        main.appendChild(login());
        break;

      case '#dashboard':
        main.appendChild(dashboard());
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
