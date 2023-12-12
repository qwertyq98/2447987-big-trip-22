import { CITIES, TYPES } from '../const';
import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    'id': '1',
    'base_price': 1100,
    'date_from': new Date('2014-01-01'),
    'date_to': new Date('2014-01-02'),
    'is_favorite': false,
    'type': getRandomArrayElement(TYPES),
    'destination': [
      {
        'id': '1',
        'name': getRandomArrayElement(CITIES),
        'description': 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
        'pictures': [
          {
            'src': 'https://loremflickr.com/248/152?random=22',
            'description': 'City',
          }
        ]
      }
    ],
    'offers': [
      {
        'offers': [
          {
            'id': 'b4c3e4e6-9053-42ce-b747-e281314baa31',
            'title': 'Upgrade to a business class',
            'price': 120
          }
        ]
      }
    ]
  },
  {
    'id': '2',
    'base_price': 5600,
    'date_from': new Date('2014-04-01'),
    'date_to': new Date('2014-05-02'),
    'is_favorite': true,
    'type': getRandomArrayElement(TYPES),
    'destination': [
      {
        'id': '2',
        'name': getRandomArrayElement(CITIES),
        'description': 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
        'pictures': [
          {
            'src': 'https://loremflickr.com/248/152?random=4',
            'description': 'City',
          }
        ]
      }
    ],
    'offers': [
      {
        'offers': [
          {
            'id': 'b4c3e4e6-9053-42ce-b747-e281314baa34',
            'title': 'Upgrade to a comfort class',
            'price': 100
          },
          {
            'id': 'b4c3e4e6-9053-42ce-b747-e281314baa33',
            'title': 'Add meal',
            'price': 15
          }
        ]
      }
    ]
  },
  {
    'id': '3',
    'base_price': 700,
    'date_from': new Date('2023-03-01'),
    'date_to': new Date('2023-05-02'),
    'is_favorite': true,
    'type': getRandomArrayElement(TYPES),
    'destination': [
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
            'description': 'City',
          }
        ]
      }
    ],
    'offers': [
      {
        'offers': [
          {
            'id': 'b4c3e4e6-9053-42ce-b747-e281314baa31',
            'title': 'Upgrade to a business class',
            'price': 120
          },
          {
            'id': 'b4c3e4e6-9053-42ce-b747-e281314baa32',
            'title': 'Travel by train',
            'price': 40
          },
          {
            'id': 'b4c3e4e6-9053-42ce-b747-e281314baa33',
            'title': 'Add meal',
            'price': 15
          }
        ]
      }
    ]
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
