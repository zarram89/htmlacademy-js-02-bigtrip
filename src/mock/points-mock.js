const mockPoints = [
  {
    'id': 'test-past-id',
    'basePrice': 100,
    'dateFrom': '2023-01-01T09:00:00.000Z', // Прошлое
    'dateTo': '2023-01-01T10:00:00.000Z',
    'type': 'ship',
    'destination': '...',
    'offerIds': []
  },
  {
    'id': 'test-present-id',
    'basePrice': 100,
    'dateFrom': '2026-04-30T09:00:00.000Z', // настоящее
    'dateTo': '2026-04-30T24:00:00.000Z',
    'type': 'bus',
    'destination': '...',
    'offerIds': []
  },
  {
    'id': '4b4efa49-494e-4bc3-aedc-a064c294d67d',
    'basePrice': 9493,
    'dateFrom': '2026-06-13T09:19:04.616Z',
    'dateTo': '2026-06-14T16:51:04.616Z',
    'destination': 'a0dfcfb1-3631-43ba-9a64-a2525d98aee2',
    'isFavorite': true,
    'offerIds': [
      'd76c0dc9-888e-44a8-9032-7728c752f6ce',
      '5c7d12d7-eeb6-4be2-a0df-74109bed2eb4',
      'b25b8bad-cd25-4ff0-9162-1437136c5d8a',
      '728a706b-13e6-4bfd-8860-2bd424872b5e',
      'da1b2710-d87d-4ea1-a999-6d21815191e4'
    ],
    'type': 'taxi'
  },
  {
    'id': 'f3590c57-0ebb-4e85-9b3c-1ca6fd6b964c',
    'basePrice': 6820,
    'dateFrom': '2026-06-15T06:47:04.616Z',
    'dateTo': '2026-06-16T09:31:04.616Z',
    'destination': 'ed90bacd-1944-473f-ad1a-03f46a816314',
    'isFavorite': true,
    'offerIds': [],
    'type': 'sightseeing'
  },
  {
    'id': 'f6b6e274-fa1e-4998-8281-c7b27f70bcfe',
    'basePrice': 2599,
    'dateFrom': '2026-06-17T08:56:04.616Z',
    'dateTo': '2026-06-18T04:54:04.616Z',
    'destination': '37f97139-69b2-4d8c-987a-1348bbd1a017',
    'isFavorite': true,
    'offerIds': [
      'da1b2710-d87d-4ea1-a999-6d21815191e4'
    ],
    'type': 'taxi'
  },
  {
    'id': '8110a376-13c2-4e7f-8f66-f341efd626f0',
    'basePrice': 2291,
    'dateFrom': '2026-06-19T01:56:04.616Z',
    'dateTo': '2026-06-20T20:49:04.616Z',
    'destination': '43bdc0db-9e06-4e43-ac80-abcd4bba6917',
    'isFavorite': true,
    'offerIds': [
      'a7540992-cef8-4ae6-a9ca-f0a8987e5017'
    ],
    'type': 'bus'
  },
  {
    'id': '9f9f89f7-c828-417e-8877-697eab887baa',
    'basePrice': 8620,
    'dateFrom': '2026-06-21T11:51:04.616Z',
    'dateTo': '2026-06-23T06:49:04.616Z',
    'destination': '4f26158d-e88a-4f6c-a283-b7976db591d2',
    'isFavorite': false,
    'offerIds': [
      '11978ba5-3bf4-4b84-88ea-1b19023a5a4b',
      '1318bc9b-9039-4ab0-904c-aeaeb45004ca',
      '8291144a-3b15-4675-9ee6-c75f9742d44d'
    ],
    'type': 'ship'
  },
  {
    'id': '32b8c653-2b4f-49f6-80ee-9b816c3122f5',
    'basePrice': 4942,
    'dateFrom': '2026-06-23T21:59:04.616Z',
    'dateTo': '2026-06-24T21:55:04.616Z',
    'destination': '0fec5d62-0620-414d-957c-301f56b5f130',
    'isFavorite': false,
    'offerIds': [
      '7e87eb63-3139-4bc7-9838-e2cecddb631d',
      '818fe77a-d51f-461c-b736-9195a6e48ba0',
      '06352766-e2fb-4b44-9145-a09665cbf959'
    ],
    'type': 'flight'
  },
  {
    'id': '29fa08b4-ce16-40c3-99de-08daf094d80b',
    'basePrice': 8840,
    'dateFrom': '2026-06-25T05:19:04.616Z',
    'dateTo': '2026-06-26T06:39:04.616Z',
    'destination': '37f97139-69b2-4d8c-987a-1348bbd1a017',
    'isFavorite': true,
    'offerIds': [
      'afff7b7c-1c23-46d8-a4d5-5289b6294020',
      '72456685-69b9-4b42-93bd-926474bf86de'
    ],
    'type': 'drive'
  },
  {
    'id': '2e60f9b3-de4a-4d9c-b68c-39911238a3d4',
    'basePrice': 3383,
    'dateFrom': '2026-06-28T05:38:04.616Z',
    'dateTo': '2026-06-28T13:28:04.616Z',
    'destination': '1db8f02e-05fe-4443-8bb6-1e723c41223c',
    'isFavorite': true,
    'offerIds': [
      'c4f8c605-f0f9-4089-8f0f-fee625faf5b7',
      'e895edd8-00dc-44d1-885f-d166b4f87355',
      '9ebc8ee1-9cc3-4889-b711-107b62670562',
      '11978ba5-3bf4-4b84-88ea-1b19023a5a4b',
      '1318bc9b-9039-4ab0-904c-aeaeb45004ca',
      '8291144a-3b15-4675-9ee6-c75f9742d44d'
    ],
    'type': 'ship'
  },
  {
    'id': '35215eb0-0da8-470a-a61b-64592edcf595',
    'basePrice': 4632,
    'dateFrom': '2026-06-30T13:27:04.616Z',
    'dateTo': '2026-07-01T06:20:04.616Z',
    'destination': '4f26158d-e88a-4f6c-a283-b7976db591d2',
    'isFavorite': false,
    'offerIds': [
      '5e725390-a6d1-4e85-9ebb-028c55046506'
    ],
    'type': 'train'
  },
  {
    'id': '89df15a8-b242-4935-9b51-11fd8d1dfcd7',
    'basePrice': 7784,
    'dateFrom': '2026-07-02T13:06:04.616Z',
    'dateTo': '2026-07-02T20:11:04.616Z',
    'destination': '4f26158d-e88a-4f6c-a283-b7976db591d2',
    'isFavorite': false,
    'offerIds': [
      '11978ba5-3bf4-4b84-88ea-1b19023a5a4b',
      '1318bc9b-9039-4ab0-904c-aeaeb45004ca',
      '8291144a-3b15-4675-9ee6-c75f9742d44d'
    ],
    'type': 'ship'
  },
  {
    'id': '4cbaecfc-9e7f-421b-85e2-c1d131af6ac6',
    'basePrice': 9168,
    'dateFrom': '2026-07-04T00:24:04.616Z',
    'dateTo': '2026-07-05T07:44:04.616Z',
    'destination': '0fec5d62-0620-414d-957c-301f56b5f130',
    'isFavorite': false,
    'offerIds': [
      '11978ba5-3bf4-4b84-88ea-1b19023a5a4b',
      '1318bc9b-9039-4ab0-904c-aeaeb45004ca',
      '8291144a-3b15-4675-9ee6-c75f9742d44d'
    ],
    'type': 'ship'
  },
  {
    'id': '8be196f4-a4ef-4fd9-a2e9-c75eb9159817',
    'basePrice': 885,
    'dateFrom': '2026-07-06T13:08:04.616Z',
    'dateTo': '2026-07-07T10:53:04.616Z',
    'destination': '1db8f02e-05fe-4443-8bb6-1e723c41223c',
    'isFavorite': true,
    'offerIds': [
      'b25b8bad-cd25-4ff0-9162-1437136c5d8a',
      '728a706b-13e6-4bfd-8860-2bd424872b5e',
      'da1b2710-d87d-4ea1-a999-6d21815191e4'
    ],
    'type': 'taxi'
  },
  {
    'id': 'c151fc6d-c634-4801-a66f-4cbf8347ffcb',
    'basePrice': 9751,
    'dateFrom': '2026-07-07T19:27:04.616Z',
    'dateTo': '2026-07-08T03:16:04.616Z',
    'destination': '0fec5d62-0620-414d-957c-301f56b5f130',
    'isFavorite': true,
    'offerIds': [
      '9ebc8ee1-9cc3-4889-b711-107b62670562',
      '11978ba5-3bf4-4b84-88ea-1b19023a5a4b',
      '1318bc9b-9039-4ab0-904c-aeaeb45004ca',
      '8291144a-3b15-4675-9ee6-c75f9742d44d'
    ],
    'type': 'ship'
  },
  {
    'id': '554f7e6c-931a-4a7d-8121-8871214c0440',
    'basePrice': 8552,
    'dateFrom': '2026-07-08T17:23:04.616Z',
    'dateTo': '2026-07-10T17:12:04.616Z',
    'destination': 'efab3bf0-a74b-4d58-85b5-bb508dcf6b3e',
    'isFavorite': true,
    'offerIds': [
      'da1b2710-d87d-4ea1-a999-6d21815191e4'
    ],
    'type': 'taxi'
  },
  {
    'id': '59a9b87c-19b9-464b-bd23-6821367e6d6c',
    'basePrice': 8651,
    'dateFrom': '2026-07-12T00:37:04.616Z',
    'dateTo': '2026-07-13T13:19:04.616Z',
    'destination': '1db8f02e-05fe-4443-8bb6-1e723c41223c',
    'isFavorite': true,
    'offerIds': [],
    'type': 'flight'
  },
  {
    'id': '75904d66-6c90-442b-8f04-8fd9e2e3684b',
    'basePrice': 6470,
    'dateFrom': '2026-07-14T15:40:04.616Z',
    'dateTo': '2026-07-15T09:09:04.616Z',
    'destination': '4f26158d-e88a-4f6c-a283-b7976db591d2',
    'isFavorite': true,
    'offerIds': [
      '2aa473c1-394a-42aa-9f13-9f6a7b0ff07e',
      'd69a04e2-7676-47bf-a64a-7ca067bdc697'
    ],
    'type': 'check-in'
  },
  {
    'id': '9a8c2237-89d7-4c86-8210-e3fc6aefc6ef',
    'basePrice': 5990,
    'dateFrom': '2026-07-16T00:46:04.616Z',
    'dateTo': '2026-07-17T03:10:04.616Z',
    'destination': '4991e8b6-8cba-4c81-88b9-d1b188881a51',
    'isFavorite': true,
    'offerIds': [],
    'type': 'restaurant'
  },
  {
    'id': 'cc37cdeb-44af-42a7-821e-03456750434e',
    'basePrice': 7460,
    'dateFrom': '2026-07-18T05:04:04.616Z',
    'dateTo': '2026-07-19T14:49:04.616Z',
    'destination': '0fec5d62-0620-414d-957c-301f56b5f130',
    'isFavorite': false,
    'offerIds': [],
    'type': 'bus'
  },
  {
    'id': 'aaead2bb-087d-4a90-816d-42c7ff6bcbd6',
    'basePrice': 8205,
    'dateFrom': '2026-07-20T20:36:04.616Z',
    'dateTo': '2026-07-22T04:40:04.616Z',
    'destination': '37f97139-69b2-4d8c-987a-1348bbd1a017',
    'isFavorite': false,
    'offerIds': [],
    'type': 'flight'
  },
  {
    'id': '02d9304b-12b3-48ce-8e72-03c4ee455d9c',
    'basePrice': 443,
    'dateFrom': '2026-07-23T23:17:04.616Z',
    'dateTo': '2026-07-24T07:26:04.616Z',
    'destination': '10969f21-f14d-49c4-b1d8-b3b4436d9d27',
    'isFavorite': false,
    'offerIds': [
      '7caec36e-1115-40d1-924f-3141605611d7',
      'a7540992-cef8-4ae6-a9ca-f0a8987e5017'
    ],
    'type': 'bus'
  },
  {
    'id': 'e95c24e8-505c-4d5f-85bd-83cf43833d28',
    'basePrice': 9065,
    'dateFrom': '2026-07-25T09:40:04.616Z',
    'dateTo': '2026-07-27T06:41:04.616Z',
    'destination': 'efab3bf0-a74b-4d58-85b5-bb508dcf6b3e',
    'isFavorite': true,
    'offerIds': [
      'afff7b7c-1c23-46d8-a4d5-5289b6294020',
      '72456685-69b9-4b42-93bd-926474bf86de'
    ],
    'type': 'drive'
  },
  {
    'id': '09e06d64-d778-40aa-aef0-0634602d0a27',
    'basePrice': 7388,
    'dateFrom': '2026-07-28T04:50:04.616Z',
    'dateTo': '2026-07-29T02:13:04.616Z',
    'destination': 'efab3bf0-a74b-4d58-85b5-bb508dcf6b3e',
    'isFavorite': false,
    'offerIds': [],
    'type': 'ship'
  },
  {
    'id': '5544eb6c-9b46-45be-ac61-4cfe1723cd25',
    'basePrice': 5646,
    'dateFrom': '2026-07-30T21:06:04.616Z',
    'dateTo': '2026-07-31T06:08:04.616Z',
    'destination': 'a0dfcfb1-3631-43ba-9a64-a2525d98aee2',
    'isFavorite': false,
    'offerIds': [
      'd69a04e2-7676-47bf-a64a-7ca067bdc697'
    ],
    'type': 'check-in'
  },
  {
    'id': 'd88d65fe-f1bb-4c0d-9d24-d155cb3f1d0c',
    'basePrice': 765,
    'dateFrom': '2026-08-01T10:19:04.616Z',
    'dateTo': '2026-08-02T20:58:04.616Z',
    'destination': 'a0dfcfb1-3631-43ba-9a64-a2525d98aee2',
    'isFavorite': false,
    'offerIds': [],
    'type': 'flight'
  },
  {
    'id': '79ff3f48-1b4e-4cab-b829-4bace4a84705',
    'basePrice': 328,
    'dateFrom': '2026-08-03T10:16:04.616Z',
    'dateTo': '2026-08-04T01:20:04.616Z',
    'destination': 'ed90bacd-1944-473f-ad1a-03f46a816314',
    'isFavorite': false,
    'offerIds': [],
    'type': 'check-in'
  }
];

export { mockPoints };
