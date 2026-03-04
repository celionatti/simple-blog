/**
 * Stock Entries API — POST new / GET all
 * Route: /api/stock
 */
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../_utils/db');
const { validateStockEntry } = require('../_utils/validate');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
      const entries = await db.collection('stock_entries')
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();

      return res.status(200).json({ entries });
    }

    if (req.method === 'POST') {
      const body = req.body;
      const errors = validateStockEntry(body);
      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(', ') });
      }

      const entry = {
        productId: body.productId,
        productName: body.productName || '',
        quantity: parseInt(body.quantity),
        supplier: (body.supplier || '').trim(),
        totalCost: parseFloat(body.totalCost) || 0,
        createdAt: new Date(),
      };

      // Insert stock entry
      await db.collection('stock_entries').insertOne(entry);

      // Increment product quantity
      await db.collection('products').updateOne(
        { _id: new ObjectId(body.productId) },
        {
          $inc: { quantity: entry.quantity },
          $set: { updatedAt: new Date() },
        }
      );

      return res.status(201).json({ message: 'Stock entry recorded', entry });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Stock API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
