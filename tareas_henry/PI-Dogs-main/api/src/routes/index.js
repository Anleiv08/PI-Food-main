const { Router } = require('express');
const { Temperament, Dog } = require('../db');
const { getAllDogs } = require('../repo/dog_repository');

const router = Router();


router.get('/dogs', async (req, res) => {
        const name = req.query.name;
        try {
            let dogList = await getAllDogs();
        if (name) { 
            let dogName = await dogList.filter(
                dog => dog.name.toLowerCase().includes(name.toLowerCase())
            );
            dogName.length ?
                res.status(200).send(dogName) :
                res.status(404).send("No podemos encontrarl el nombre del perro")
        } else { 
            res.status(200).json(dogList)
        }
        
        } catch (error) {
            console.log(error)
            res.status(500).json("Ha un problema interno, intenta nuevamente")
        }
    });

router.get('/dogs/:idRaza', async (req, res) => {
       try {
           const { idRaza } = req.params;
           const allDogs = await getAllDogs();
           if (!idRaza) {
               res.status(404).json("Raza no encontrada")
           } else {
               const dog = allDogs.find(dogui => dogui.id.toString() === idRaza);
               res.status(200).json(dog)
           }
       } catch (error) {
           res.status(404).send(error)
       }
   });


router.post('/dogs', async (req, res) => {
    var { 
        name,
        image,
        breed,
        temperament,
        lifespan,
        weight,
        height,
    } = req.body;
    
    if(!image){
        try {
            image = await (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message;
        } catch (error) {
            console.log(error)
        }
    }
        const createDog = await Dog.create({
            name: name,
            image: image,
            breed: breed,
            lifespan: lifespan,
            weight: weight,
            height: height,
            image : image
        });
        temperament.map(async temperaments => {
            const findTemp = await Temperament.findAll({
                where: { name: temperaments }
            });
            createDog.addTemperament(findTemp);
        })
        res.status(200).send(createDog);

    
});

router.get('/temperament', async (req, res) => {
    const allData = await axios.get(URL);
    try {
        let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
      
        let eachTemperament = [...new Set(everyTemperament.flat())];
        eachTemperament.forEach(el => {
            if (el) {
                Temperament.findOrCreate({
                    where: { name: el }
                });
            }
        });
        eachTemperament = await Temperament.findAll();
        res.status(200).json(eachTemperament);
    } catch (error) {
        res.status(404).send(error)
    }
});

router.get('/dog/',async (req, res) => {
    const temperament = req.query.temperament;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (temperament === 'all') return everyDog
        else if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult)
});

router.post('/temperament/:temperament', async (req, res) => {
    try{
    const newTemperament = req.params.temperament;
    const postedTemp = await Temperament.create({
       name: newTemperament,
    });
    return res.status(200).json(postedTemp)
    } catch (error) {
        res.status(404).send(error)
    }
});
   


module.exports = router;
