
import Location from './models/locationModel.js';
import Events from './models/eventModel.js';


const insertInitialUserData = async () => {

  const locationData = [
    {
        name: 'Nova Jazz Cava',
        category: 'Jazz Venue',
        latitude: 41.56406,
        longitude: 2.01395,
    },
    {
        name: 'Jamboree',
        category: 'Jazz Club',
        latitude: 41.37971,
        longitude: 2.17519,
    },
    {
      name: 'La Nau',
      category: 'Sala Rock',
      latitude: 41.39447,
      longitude: 2.19708,
  },
    {
     name: 'Kursaal Manresa',
     category: 'Auditori',
     latitude: 41.72812,
     longitude: 1.82288,
   }
];

  await Location.bulkCreate(locationData, { ignoreDuplicates: true });

  const eventsData = [
    {
      title: 'Omuamua Jazz Trio',
      category: 'Jazz',
      start_time: '2024-12-18T20:00:00',
      end_time: '2024-12-18T23:00:00',
      color: '#FF5733',
    },
    {
      title: 'Los Pungas',
      category: 'Cumbia-Metal',
      start_time: '2024-12-25T19:00:00',
      end_time: '2024-12-25T22:00:00',
      color: '#C70039',
    },
    {
      title: 'Dj-Chot',
      category: 'techno havaneras',
      start_time: '2024-12-31T22:00:00',
      end_time: '2025-01-01T23:55:00',
      color: '#FFC300',
    },
    {
      title: 'Papos Blues',
      category: 'Blues',
      start_time: '2025-01-10T20:00:00',
      end_time: '2025-01-10T23:00:00',
      color: '#DAF7A6',
    },
    {
      title: 'Catalonia Music Awards',
      category: 'Blues',
      start_time: '2025-01-25T19:00:00',
      end_time: '2025-01-25T23:00:00',
      color: '#581845',
    },
    {
      title: 'Rock Legends Night',
      category: 'Rock',
      start_time: '2025-02-10T20:00:00',
      end_time: '2025-02-10T23:30:00',
      color: '#900C3F',
    },
    {
      title: 'Pepito y los Jazzers',
      category: 'Jazz',
      start_time: '2025-02-28T19:00:00',
      end_time: '2025-02-28T21:00:00',
      color: '#2ECC71',
    },
  ];

  await Events.bulkCreate(eventsData, { ignoreDuplicates: true });
}

export { insertInitialUserData };
