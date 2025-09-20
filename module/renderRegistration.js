import { setToken, setName, registration } from './api.js';
import { renderComments } from './load.js';
import { renderLogin } from './renderLogin.js';

export function renderRegistration() {
    const container = document.querySelector('.container');
    const loginForm = `
    <section class="add-form">
    <h1>Форма регистрации</h1>
    <input type="text" class="add-form-name" id="name" placeholder="Введите имя" required>
    <input type="text" class="add-form-name" id="login" placeholder="Введите логин" required>
    <input type="password" class="add-form-name" id="password" placeholder="Введите пароль" required>
    <fieldset class="add-form-registry">
      <button class="add-form-button-main button-main" type="submit">Зарегистрироваться</button>
      <u class="add-form-button-link entry">Войти</u>
    </fieldset>
  </section>
  `;

    container.innerHTML = loginForm;

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin();
    });

    const nameEl = document.querySelector('#name');
    const loginEl = document.querySelector('#login');
    const passwordEl = document.querySelector('#password');
    const enterBtn = document.querySelector('.button-main');

    enterBtn.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setToken(data.user.token);
                setName(data.user.name);
                renderComments();
            });
    });
}
