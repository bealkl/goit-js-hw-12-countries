'use strict';

import './normalize.css';
import './style.css';
// default styles
import '@pnotify/core/dist/PNotify.css';
// default theme
import '@pnotify/core/dist/BrightTheme.css';
// import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import { alert } from '@pnotify/core';
import _ from 'lodash';
// import PNotify from '@pnotify/core/dist/PNotify.js';

const refs = {
  inputCountry: document.querySelector('#inputCountry'),
  listContry: document.querySelector('#listCountry'),
};
refs.inputCountry.addEventListener('input', _.debounce(fetchCountries, 500));

function fetchCountries() {
  if (refs.inputCountry.value == '') return;
  fetch(`https://restcountries.eu/rest/v2/name/${refs.inputCountry.value}`)
    .then(result => result.json())
    .then(data => showCountries(data));
}

function showCountries(items) {
  refs.listContry.innerHTML = '';
  if (items.length > 10) {
    // PNotify.alert((title: 'Запрос не найден!'), (text: 'Пожалуйста, введите более точный запрос.'));
    const myAlert = alert({
      text: 'Пожалуйста, введите более точный запрос.',
      type: 'Alert',
      delay: 2000,
    });
    return;
  }
  if (items.length === 1) {
    const langList = items[0].languages.map(item => `<li>${item.name}</li>`).join('');
    refs.listContry.insertAdjacentHTML(
      'beforeend',
      `<h1>${items[0].name}</h1><div id="countryBlock"><div id="infoCountry"><p><b>Capital: </b>${items[0].capital}</p><p><b>Population: </b>${items[0].population}</p><ul><b>Languages: </b>${langList}</ul></div><img src="${items[0].flag}" alt="${items[0].capital}_flag"></div>`,
    );
  } else {
    refs.listContry.insertAdjacentHTML('beforeend', items.map(item => `<li>${item.name}</li>`).join(''));
  }
}
