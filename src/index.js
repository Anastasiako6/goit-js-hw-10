import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const input = document.querySelector('#search-box');
const countryListElement = document.querySelector('.country-list');
const countryInfoElement = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce((e) => {
    const nameElem = input.value.trim();
    cleanHtml();

    if (nameElem !== '') {
        fetchCountries(nameElem).then(foundCountry => {
            if (foundCountry.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            } else if (foundCountry.length === 0) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else if (foundCountry.length >= 2 && foundCountry.length <= 10) {
                showListCountry(foundCountry);
            } else if (foundCountry.length === 1) {
                showOneContry(foundCountry);
        }
    }).catch(error => console.log(error))
}
}, DEBOUNCE_DELAY))

function showListCountry(countries) {
  const countryList = countries
    .map(country => {
      return `<li class="flex-item">
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <p>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryListElement.innerHTML = countryList;
};

function showOneContry(countries) {
      const countryList = countries
    .map(country => {
      return `<li class="single-country">
    <div class ="wrapper">
    <img class="img-single" src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
        <p class ="title-single">${country.name.official}</p>
        </div>
        <p class ="text-single"><b>Capital</b>: ${country.capital}</p>
        <p class ="text-single"><b>Population</b>: ${country.population}</p>
        <p class ="text-single"><b>Languages</b>: ${Object.values(country.languages)} </p>
        </li>`;
    })
    .join('');
  countryListElement.innerHTML = countryList;
}
  
function cleanHtml() {
  countryListElement.innerHTML = '';
  countryInfoElement.innerHTML = '';
}