
// import cors from 'cors';
// import { initMongoConnection } from './db/initMongoConnection.js';
import setUpServer from './server.js';

export const bootstrap = async () => {
    await initMongoConnection();
    setUpServer();
};
// bootstrap();
setUpServer();




// app.use(cors());

// app.use((req, res, next) => {
//     const { key } = req.query;
//     console.log(key);
//     if (key !== '12345678') {
//         return res.status(401).send({ message: 'Please provide valid key' });
//     }
//     next();
// });

// app.get('/', (req, res) => {
//     res.status(200);
//     res.send('Get: Hello Nikolai!!!');
// });

// app.listen(8080, () => {
//     console.log('Server started on port 8080');
// });
