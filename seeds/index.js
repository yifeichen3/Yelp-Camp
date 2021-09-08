const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6133fbe31517ce63a8c19211',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'bla bla bla',
            price: price,
            geometry: { coordinates: [cities[random1000].longitude, cities[random1000].latitude], type: 'Point' },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvmqe4rhl/image/upload/v1630885908/YelpCamp/st9biwmphle0zkjo3txj.jpg',
                    filename: 'YelpCamp/st9biwmphle0zkjo3txj'
                }
            ]
        })
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close();
})