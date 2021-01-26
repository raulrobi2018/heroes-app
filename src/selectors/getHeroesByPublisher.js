import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {
  const validPublishers = ["DC Comics", "Marvel Comics"];

  //   Si no es un publisher valido, retorna error
  if (!validPublishers.includes(publisher)) {
    throw new Error(`Publisher "${publisher}" do not exist`);
  }

  return heroes.filter((hero) => hero.publisher === publisher);
};
