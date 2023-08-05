const Inventory = require('../models/Inventory');

const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({});
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving inventory', error: error.message });
  }
};

const createInventory = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newItem = await Inventory.create({ name, quantity });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating inventory item', error: error.message });
  }
};

const updateInventory = async (req, res) => {
  const itemId = req.params.id;
  const { name, quantity } = req.body;
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(itemId, { name, quantity }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory item', error: error.message });
  }
};

const deleteInventory = async (req, res) => {
  const itemId = req.params.id;
  try {
    await Inventory.findByIdAndDelete(itemId);
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inventory item', error: error.message });
  }
};

module.exports = { getAllInventory, createInventory, updateInventory, deleteInventory };