const TYPES = [
  'taxi', 'bus', 'train', 'flight',
  'check-in', 'sightseeing', 'ship',
  'drive', 'restaurant'
];

const EMPTY_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: null,
  isFavorite: false,
  offerIds: [],
  type: TYPES[0],
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export { TYPES, EMPTY_POINT, FilterType };
