export default (message) => {
  const alert = document.createElement('div');
  alert.classList.add('customAlert');
  alert.innerText = message;

  const body = document.querySelector('body');
  body.appendChild(alert);

  setTimeout(() => {
    body.removeChild(alert);
  }, 3000); // 3000 milissegundos = 3 segundos
};
