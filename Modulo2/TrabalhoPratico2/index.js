const fs = require('fs').promises;

init();

async function init() {
  await readJson();
  await moreOrLessCities(true);
  await moreOrLessCities(false);
  await maxOrMinNameCities(true);
  await maxOrMinNameCities(false);
  await maxOrMinCityName(true);
  await maxOrMinCityName(false);
}

async function readJson() {
  let data = await fs.readFile('./database/Estados.json');
  const states = JSON.parse(data);

  data = await fs.readFile('./database/Cidades.json');
  const cities = JSON.parse(data);

  for (state of states) {
    const stateCities = cities.filter((city) => city.Estado === state.ID);
    await fs.writeFile(
      `./states/${state.Sigla}.json`,
      JSON.stringify(stateCities)
    );
  }
}

async function citiesCount(uf) {
  const data = await fs.readFile(`./states/${uf}.json`);
  const cities = JSON.parse(data);
  return cities.length;
}

async function moreOrLessCities(more) {
  const states = JSON.parse(await fs.readFile('./database/Estados.json'));
  const list = [];

  for (state of states) {
    const count = await citiesCount(state.Sigla);
    list.push({ uf: state.Sigla, count });
  }

  list.sort((a, b) => {
    if (a.count < b.count) return 1;
    else if (a.count > b.count) return -1;
    else return 0;
  });

  const result = [];
  if (more) {
    list
      .slice(0, 5)
      .forEach((item) => result.push(item.uf + ' - ' + item.count));
  } else {
    list.slice(-5).forEach((item) => result.push(item.uf + ' - ' + item.count));
  }

  console.log(result);
}

async function maxOrMinNameCities(bigger) {
  const states = JSON.parse(await fs.readFile('./database/Estados.json'));
  const result = [];

  for (state of states) {
    let city;
    if (bigger) {
      city = await maxName(state.Sigla);
    } else {
      city = await minName(state.Sigla);
    }

    result.push(city.Nome + ' - ' + state.Sigla);
  }
  console.log(result);
}

async function maxName(uf) {
  const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`));

  let result;

  cities.forEach((city) => {
    if (!result) result = city;
    else if (city.Nome.length > result.Nome.length) result = city;
    else if (
      city.Nome.length === result.Nome.length &&
      city.Nome.toLowerCase() < result.Nome.toLowerCase()
    )
      result = city;
  });

  return result;
}

async function minName(uf) {
  const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`));

  let result;

  cities.forEach((city) => {
    if (!result) result = city;
    else if (city.Nome.length < result.Nome.length) result = city;
    else if (
      city.Nome.length === result.Nome.length &&
      city.Nome.toLowerCase() < result.Nome.toLowerCase()
    )
      result = city;
  });

  return result;
}

async function maxOrMinCityName(bigger) {
  const states = JSON.parse(await fs.readFile('./database/Estados.json'));
  const list = [];
  for (state of states) {
    let city;
    if (bigger) {
      city = await maxName(state.Sigla);
    } else {
      city = await minName(state.Sigla);
    }
    list.push({ name: city.Nome, uf: state.Sigla });
  }
  const result = list.reduce((prev, current) => {
    if (bigger) {
      if (prev.name.length > current.name.length) return prev;
      else if (prev.name.length < current.name.length) return current;
      else
        return prev.name.toLowerCase() < current.name.toLowerCase()
          ? prev
          : current;
    } else {
      if (prev.name.length < current.name.length) return prev;
      else if (prev.name.length > current.name.length) return current;
      else
        return prev.name.toLowerCase() < current.name.toLowerCase()
          ? prev
          : current;
    }
  });
  console.log(result.name + ' - ' + result.uf);
}
