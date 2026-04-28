const getRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateId = () => crypto.randomUUID();

export {getRandomItem, getRandomInt, generateId};
