const PetController = require('../controllers/pet.controller');

module.exports = function(app){
    app.post('/api/pets', PetController.createPet);
    app.get('/api/pets', PetController.getAllPets);
    app.get('/api/pets/:id', PetController.getPet);
    app.delete('/api/pets/:id', PetController.deletePet);
    app.put('/api/pets/:id', PetController.updatePet);

}