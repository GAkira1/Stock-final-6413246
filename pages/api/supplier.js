import connectToDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      const supplier = await db.collection('suppliers').findOne({ _id: id });
      res.status(200).json(supplier);
      break;
    }
    case 'PUT': {
      const supplier = req.body;
      const result = await db.collection('suppliers').updateOne({ _id: id }, { $set: supplier });
      if (result.modifiedCount === 1) {
        const updatedSupplier = await db.collection('suppliers').findOne({ _id: id });
        res.status(200).json(updatedSupplier);
      } else {
        res.status(404).json({ message: 'Supplier not found' });
      }
      break;
    }
    case 'DELETE': {
      const result = await db.collection('suppliers').deleteOne({ _id: id });
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
