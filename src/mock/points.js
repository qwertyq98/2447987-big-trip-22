import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    'id': '428f524d-c192-41ef-8c78-f88aaeb242a8',
    'base_price': 1100,
    'date_from': '2019-07-11T11:22:13.375Z',
    'date_to': '2019-07-12T17:50:13.375Z',
    'is_favorite': false,
    'type': 'bus',
    'destination': '8b3a92c1-b937-4192-bd7f-947a1162deff',
    'offers': [
      'ef57af96-5195-4e05-8c64-092f580271e7'
    ],
  },
  {
    'id': '2703759f-c484-46eb-b42e-e7d4fc46127f',
    'base_price': 5600,
    'date_from': '2023-05-30T03:42:13.375Z',
    'date_to': '2023-05-31T17:18:13.375Z',
    'is_favorite': true,
    'type': 'taxi',
    'destination': '405da16f-1d95-4389-8cd3-850147dceefa',
    'offers': [
      '6caab1bd-2434-42d3-b0bb-e11e0f936a90',
      '5dca0ac3-0e05-493b-9131-c5298fb1d6ee',
      '2fbedd9a-d4ee-4b8d-b445-04de508cc296',
    ],
  },
  {
    'id': '5b3604f6-66c7-42c7-9525-30b8cc0bec88',
    'base_price': 700,
    'date_from': '2024-04-12T09:58:13.375Z',
    'date_to': '2024-04-14T18:01:13.375Z',
    'is_favorite': true,
    'type': 'sightseeing',
    'destination': '01ca66e8-0a93-4bab-b676-a5a6d734b66e',
    'offers': [],
  },
  {
    'id': '3f66b485-6a48-41d7-9815-f3eec52c3321',
    'base_price': 5654,
    'date_from': '2024-01-08T04:28:04.116Z',
    'date_to': '2024-01-09T21:20:04.116Z',
    'destination': '74b376dd-84a9-4e34-a860-42836e174d12',
    'is_favorite': true,
    'offers': [
      '4fbf382c-7cef-4b11-8ab8-10b1f5a30c75',
      '2fbedd9a-d4ee-4b8d-b445-04de508cc296'
    ],
    'type': 'taxi'
  },
  {
    'id': 'f83df08e-1e5a-4bdc-b625-9aac7aaaf4e9',
    'base_price': 6802,
    'date_from': '2024-01-10T08:39:04.116Z',
    'date_to': '2024-01-11T08:14:04.116Z',
    'destination': '8b3a92c1-b937-4192-bd7f-947a1162deff',
    'is_favorite': false,
    'offers': [
      '0277d488-5e67-4237-8d8b-86b40a3fc4bc',
      '4fbf382c-7cef-4b11-8ab8-10b1f5a30c75',
      '2fbedd9a-d4ee-4b8d-b445-04de508cc296'
    ],
    'type': 'taxi'
  },
  {
    'id': '2067edc8-b8a1-47f4-8476-a78cc372fb4a',
    'base_price': 4710,
    'date_from': '2024-01-17T06:22:04.116Z',
    'date_to': '2024-01-18T23:26:04.116Z',
    'destination': '01ca66e8-0a93-4bab-b676-a5a6d734b66e',
    'is_favorite': true,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '25ae8fff-da15-498b-930d-66b93bc2c722',
    'base_price': 8310,
    'date_from': '2024-01-19T08:30:04.116Z',
    'date_to': '2024-01-20T08:03:04.116Z',
    'destination': '405da16f-1d95-4389-8cd3-850147dceefa',
    'is_favorite': true,
    'offers': [],
    'type': 'train'
  },
  {
    'id': '5d237189-37bf-41a8-97ef-516d05b7e23e',
    'base_price': 5675,
    'date_from': '2024-01-21T05:44:04.116Z',
    'date_to': '2024-01-21T20:05:04.116Z',
    'destination': '5eb9455e-c256-476d-ac93-58e32d3b4c31',
    'is_favorite': true,
    'offers': [
      '35ccc278-eecd-421a-8bf1-a7fc70b654ef'
    ],
    'type': 'bus'
  },
  {
    'id': 'eb94447b-0ed6-4b47-a188-537c2bb7717a',
    'base_price': 8649,
    'date_from': '2024-01-22T05:21:04.116Z',
    'date_to': '2024-01-23T01:05:04.116Z',
    'destination': '8b3a92c1-b937-4192-bd7f-947a1162deff',
    'is_favorite': true,
    'offers': [
      '998e2ce7-3e0a-4cac-ba25-0469816d8493',
      '284e5bee-3f6f-445d-8e94-d7a5931dca16'
    ],
    'type': 'drive'
  },
  {
    'id': '25e41833-00d1-4a68-bb1b-851fccb572b7',
    'base_price': 3934,
    'date_from': '2024-01-24T00:56:04.116Z',
    'date_to': '2024-01-24T11:38:04.116Z',
    'destination': '74b376dd-84a9-4e34-a860-42836e174d12',
    'is_favorite': false,
    'offers': [
      '0277d488-5e67-4237-8d8b-86b40a3fc4bc',
      '4fbf382c-7cef-4b11-8ab8-10b1f5a30c75',
      '2fbedd9a-d4ee-4b8d-b445-04de508cc296'
    ],
    'type': 'taxi'
  },
  {
    'id': '0997bed3-e810-4b3d-bd3d-0cf37db3dfb4',
    'base_price': 227,
    'date_from': '2024-01-26T02:40:04.116Z',
    'date_to': '2024-01-27T14:49:04.116Z',
    'destination': '0773b911-a838-4bbf-9f1f-762ae637a74c',
    'is_favorite': true,
    'offers': [
      '5451229e-26b8-48e8-83df-83e90fd0e55b',
      '2678cf2d-8076-425c-a761-b16e885bb3e5',
      '7661fdd2-f3cb-4769-a68f-885307ce1bd3'
    ],
    'type': 'ship'
  }
];


function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
