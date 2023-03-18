import { ObjectId } from 'mongodb';
import connectToDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const { id } = req.query;
      if (id) {
        const supplier = await db.collection('suppliers').findOne({ _id: ObjectId(id) });
        res.status(200).json(supplier);
      } else {
        const suppliers = await db.collection('suppliers').find().toArray();
        res.status(200).json(suppliers);
      }
      break;
    }
    case 'POST': {
      const supplier = req.body;
      const result = await db.collection('suppliers').insertOne(supplier);
      const newSupplier = result.ops[0];
      res.status(201).json(newSupplier);
      break;
    }
    case 'PUT': {
      const { id } = req.query;
      const supplier = req.body;
      const result = await db.collection('suppliers').updateOne({ _id: ObjectId(id) }, { $set: supplier });
      if (result.modifiedCount === 1) {
        const updatedSupplier = await db.collection('suppliers').findOne({ _id: ObjectId(id) });
        res.status(200).json(updatedSupplier);
      } else {
        res.status(404).json({ message: 'Supplier not found' });
      }
      break;
    }
    case 'DELETE': {
      const { id } = req.query;
      const result = await db.collection('suppliers').deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Supplier not found' });
      }
      break;
    }
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
