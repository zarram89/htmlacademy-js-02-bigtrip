import { getRandomItem, getRandomInt, generateId } from '../utils.js';
import { TYPES } from '../const.js';

const generatePicture = () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInt(1, 1000)}`,
  description: 'Random travel photo'
});

const generateDestination = () => ({
  id: generateId(),
  name: `City ${getRandomInt(1, 20)}`,
  description: 'Lorem ipsum dolor sit amet...',
  pictures: Array.from({ length: getRandomInt(0, 3) }, generatePicture)
});

const generateOffer = () => ({
  id: generateId(),
  title: `Option ${getRandomInt(1, 10)}`,
  price: getRandomInt(10, 200)
});

const generateOffersByType = () =>
  TYPES.map((type) => ({
    type,
    offers: Array.from({ length: getRandomInt(0, 5) }, generateOffer)
  }));

const generatePoint = (destinations, offersByType) => {
  const type = getRandomItem(TYPES);
  const destination = getRandomItem(destinations);

  const availableOffers =
    offersByType.find((o) => o.type === type)?.offers || [];

  const selectedOffers = availableOffers
    .slice(0, getRandomInt(0, availableOffers.length))
    .map((o) => o.id);

  return {
    id: generateId(),
    basePrice: getRandomInt(100, 10000),
    dateFrom: new Date().toISOString(),
    dateTo: new Date(Date.now() + 3600000).toISOString(),
    destinationId: destination.id,
    isFavorite: Math.random() > 0.5,
    offerIds: selectedOffers,
    type
  };
};

export const generateMockData = () => {
  const destinations = Array.from({ length: 10 }, generateDestination);
  const offers = generateOffersByType();
  const points = Array.from({ length: 10 }, () => generatePoint(destinations, offers));

  return { points, destinations, offers };
};
