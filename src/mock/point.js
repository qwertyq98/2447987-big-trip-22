import { CITIES, OFFERS_TITLE, TYPES } from '../const';
import { getRandomArrayElement } from '../utils';

const MockDestination = [
  {
    'id': '1',
    'name': getRandomArrayElement(CITIES),
    'description': 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=22',
        'description': getRandomArrayElement(CITIES),
      }
    ]
  },
  {
    'id': '2',
    'name': getRandomArrayElement(CITIES),
    'description': 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=4',
        'description': getRandomArrayElement(CITIES),
      }
    ]
  },
  {
    'id': '3',
    'name': getRandomArrayElement(CITIES),
    'description': 'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=2',
        'description': 'City',
      },
      {
        'src': 'https://loremflickr.com/248/152?random=27',
        'description': getRandomArrayElement(CITIES),
      }
    ]
  }
];

const MockOffers = [
  {
    'type': getRandomArrayElement(TYPES),
    'offers': [
      {
        'id': 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        'title': getRandomArrayElement(OFFERS_TITLE),
        'price': 120
      },
      {
        'id': 'b4c3e4e6-9053-42ce-b747-e281314baa32',
        'title': getRandomArrayElement(OFFERS_TITLE),
        'price': 40
      },
      {
        'id': 'b4c3e4e6-9053-42ce-b747-e281314baa33',
        'title': getRandomArrayElement(OFFERS_TITLE),
        'price': 15
      }
    ]
  },
  {
    'type': getRandomArrayElement(TYPES),
    'offers': [
      {
        'id': 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        'title': getRandomArrayElement(OFFERS_TITLE),
        'price': 120
      }
    ]
  },
  {
    'type': getRandomArrayElement(TYPES),
    'offers': [
      {
        'id': 'b4c3e4e6-9053-42ce-b747-e281314baa34',
        'title': getRandomArrayElement(OFFERS_TITLE),
        'price': 100
      },
      {
        'id': 'b4c3e4e6-9053-42ce-b747-e281314baa33',
        'title': getRandomArrayElement(OFFERS_TITLE),
        'price': 15
      },
    ]
  }
];

const mockPoints = [
  {
    'id': '1',
    'base_price': 1100,
    'date_from': '2019-07-11T11:22:13.375Z',
    'date_to': '2019-07-12T17:50:13.375Z',
    'is_favorite': false,
    'type': getRandomArrayElement(TYPES),
    'destination': getRandomArrayElement(MockDestination),
    'offers': getRandomArrayElement(MockOffers),
  },
  {
    'id': '2',
    'base_price': 5600,
    'date_from': '2023-05-30T03:42:13.375Z',
    'date_to': '2023-05-31T17:18:13.375Z',
    'is_favorite': true,
    'type': getRandomArrayElement(TYPES),
    'destination': getRandomArrayElement(MockDestination),
    'offers': getRandomArrayElement(MockOffers),
  },
  {
    'id': '3',
    'base_price': 700,
    'date_from': '2024-04-12T09:58:13.375Z',
    'date_to': '2024-04-14T18:01:13.375Z',
    'is_favorite': true,
    'type': getRandomArrayElement(TYPES),
    'destination': getRandomArrayElement(MockDestination),
    'offers': getRandomArrayElement(MockOffers),
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
