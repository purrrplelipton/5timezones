const { log } = console;
const baseURL = 'https://restcountries.com/v3.1/all';

export default async function getCountries() {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();
    return data;
  } catch (error) {
    log('Error fetching countries:', error);
    return [];
  }
}
