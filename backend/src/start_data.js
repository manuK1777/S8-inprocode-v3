// import User from './models/userModel.js';
// import Book from './models/bookModel.js';
// import Artist from './models/artistModel.js';
import Location from './models/locationModel.js';


const insertInitialUserData = async () => {

  const userData = [
    {
      email: 'ismael.academy@gmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Ismael',
      roles: ['user']
    }, 
    {
      email: 'laura@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Laura',
      roles: ['user']
    },
    {
      email: 'maria@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Maria',
      surname: 'kale',
      roles: ['mod', 'admin']
    },
    {
      email: 'mod@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Moderador',
      surname: 'kale',
      roles: ['admin']
    },
    {
      email: 'admin@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Admin',
      surname: 'kale',
      roles: ['admin']
    }
  ];
  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  // await User.bulkCreate(userData, { ignoreDuplicates: true });
  
  const bookData = [
    { title: 'TituloA', year: 1955 },
    { title: 'TituloB', year: 1988 },
    { title: 'TituloC', year: 1475, user_id: 2 }
  ];

  const locationData = [
    {
        name: 'Nova Jazz Cava',
        category: 'Jazz Venue',
        latitude: 41.56406,
        longitude: 2.01395,
        description: 'A popular jazz venue in Terrassa, Catalonia.'
    },
    {
        name: 'Jamboree',
        category: 'Jazz Club',
        latitude: 41.37971,
        longitude: 2.17519,
        description: 'A renowned jazz club in Barcelona, located in Plaça Reial.'
    }
];

  await Location.bulkCreate(locationData, { ignoreDuplicates: true });

  // const artistData = [
  //   { name: 'ArtistaA', email: 'artistA@hotmail.com', contact: 'contactoA', phone: 'phoneA', webPage: 'webPageA', user_id: 2 },
  //   { name: 'ArtistaB', email: 'artistB@hotmail.com', contact: 'contactoB', phone: 'phoneB', webPage: 'webPageB', user_id: 2 }
  // ]
  // Insertar datos con opción ignoreDuplicates
  // await Book.bulkCreate(bookData, { ignoreDuplicates: true });
  // await Artist.bulkCreate(artistData, { ignoreDuplicates: true });
}

export { insertInitialUserData };
