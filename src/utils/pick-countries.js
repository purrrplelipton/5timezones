import getCountries from '@services/get-countries';
import getRandomInt from './get-random-int';

// const { log } = console;

export default async function pickCountries() {
  const countries = await getCountries();
  const regions = countries.map((country) => country.region);
  const uniqueRegions = [];
  regions.forEach((region) => {
    if (!uniqueRegions.includes(region)) {
      uniqueRegions.push(region);
    }
  });

  const selected = uniqueRegions.map((region) => {
    const countriesInRegion = countries.filter(
      (country) => country.region === region,
    );
    const index = getRandomInt(0, countriesInRegion.length - 1);
    const chosenCountry = countriesInRegion[index];
    return {
      region: chosenCountry.region,
      name: chosenCountry.name.common,
      cca3: chosenCountry.cca3,
      timezone: chosenCountry.timezones[0],
    };
  });

  return selected;
}
