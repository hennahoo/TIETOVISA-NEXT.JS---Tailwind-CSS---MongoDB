import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {

if (connection.isConnected) {

return;

}

const db = await mongoose.connect(process.env.MONGODB_URI, {

useNewUrlParser: true,

useUnifiedTopology: true,

useCreateIndex: true,

});

connection.isConnected = db.connections[0].readyState;

console.log('Tietokanta yhdistetty');

}

export default dbConnect;