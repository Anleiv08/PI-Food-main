const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../db');
const routes = require('../routes/index');
const breed_URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const getAllDogs = async () => {


    const apiDogList = await getApiDogList();
    const dbDogList = await getDbDogList();
    const finalDogList = apiDogList.concat(dbDogList);
    return finalDogList;
};

const getApiDogList = async () => {
    const apiURL = await axios.get(breed_URL);
    const apiInfo = await apiURL.data.map(response => {
        return { 
            id: response.id,
            name: response.name,
            image: response.reference_image_id,
            breed: response.breed_group,
            temperament: response.temperament,
            lifespan: response.life_span,
            weight: parseInt(response.weight.metric.slice(0, 2).trim()),
            height: parseInt(response.height.metric.slice(0, 2).trim()),
        };
    });
    return apiInfo;
};

const getDbDogList = async () => {
    var dogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    return dogs;
};






module.exports = {
    getAllDogs, getApiDogList, getDbDogList
};