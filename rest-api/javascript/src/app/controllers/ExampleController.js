class ExampleController {
  async index(req, res) {
    return res.json({ message: 'Route to read something' });
  }

  async store(req, res) {
    return res.json({ message: 'Route to create something' });
  }

  async update(req, res) {
    const { id } = req.params;
    return res.json({ message: `Route to update the id ${id}` });
  }

  async delete(req, res) {
    const { id } = req.params;
    return res.json({ message: `Route to delete the id ${id}` });
  }
}

export default new ExampleController();
