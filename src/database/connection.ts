import { createConnection } from 'typeorm';

export default createConnection().then(() => console.log('📦 Successfuly connected with database'));