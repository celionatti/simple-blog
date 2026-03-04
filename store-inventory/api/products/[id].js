/**
 * Products API — GET one / PUT / DELETE
 * Route: /api/products/:id
 */
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../_utils/db');
const { validateProduct } = require('../_utils/validate');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { id } = req.query;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('products');
    const objectId = new ObjectId(id);

    if (req.method === 'GET') {
      const product = await collection.findOne({ _id: objectId });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json(product);
    }

    if (req.method === 'PUT') {
      const body = req.body;
      const errors = validateProduct(body);
      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(', ') });
      }

      // Check barcode uniqueness (exclude current product)
      const existing = await collection.findOne({
        barcode: body.barcode.trim(),
        _id: { $ne: objectId },
      });
      if (existing) {
        return res.status(409).json({ error: 'Another product with this barcode already exists' });
      }

      const update = {
        $set: {
          name: body.name.trim(),
          sku: body.sku.trim(),
          barcode: body.barcode.trim(),
          category: (body.category || '').trim(),
          costPrice: parseFloat(body.costPrice) || 0,
          sellingPrice: parseFloat(body.sellingPrice) || 0,
          quantity: parseInt(body.quantity) || 0,
          reorderLevel: parseInt(body.reorderLevel) || 10,
          updatedAt: new Date(),
        },
      };

      const result = await collection.updateOne({ _id: objectId }, update);
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product updated' });
    }

    if (req.method === 'DELETE') {
      const result = await collection.deleteOne({ _id: objectId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Product [id] API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
