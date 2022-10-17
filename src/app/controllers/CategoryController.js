const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

class CategoryController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.json(categories);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    const contact = await CategoriesRepository.findById(id);

    if (!contact) {
      // 404: not found!
      return response.status(404).json({ error: 'User not found!' });
    }

    return response.json(contact);
  }

  async store(request, response) {
    // Criar novo registro
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    const category = await CategoriesRepository.create({ name });

    return response.status(201).json(category);
  }
}

// Singleton
module.exports = new CategoryController();
