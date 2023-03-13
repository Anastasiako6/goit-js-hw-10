const link = 'https://restcountries.com/v3.1/name';
const filters = 'fields=name,capital,population,flags,languages';
function fetchCountries(name) {
  return fetch(`${link}/${name}?${filters}`).then(function (response) {
    if (response.status === 404) {
      throw Error('Oops, there is no country with that name');
    }
    return response.json();
  });
}

export { fetchCountries };