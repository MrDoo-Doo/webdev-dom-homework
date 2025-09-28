import { login, setToken, setName } from './api.js';
import { renderComments } from './load.js';
import { renderRegistration } from './renderRegistration.js';

export function renderLogin() {
    const container = document.querySelector('.container');
    const loginForm = `
    <section class="add-form">
    <h1>Форма авторизации</h1>
    <input type="text" class="add-form-name" id="login" placeholder="Введите логин" required>
    <input type="text" class="add-form-name" id="password" placeholder="Введите пароль" required>
    <fieldset class="add-form-registry">
      <button class="add-form-button-main button-main" type="submit">Войти</button>
      <u class="add-form-button-link registry">Зарегистрироваться</u>
    </fieldset>
  </section>
  `;

    container.innerHTML = loginForm;

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration();
    });

    const loginEl = document.querySelector('#login');
    const passwordEl = document.querySelector('#password');
    const enterBtn = document.querySelector('.button-main');

    enterBtn.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
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
