import React, { useState } from 'react';
import fetch from 'node-fetch';

function SupplierForm({ supplier, onSave }) {
  const [name, setName] = useState(supplier?.name || '');
  const [address, setAddress] = useState(supplier?.address || '');
  const [phone, setPhone] = useState(supplier?.phone || '');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await saveSupplier({ name, address, phone });
      onSave(data);
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  }

  async function saveSupplier(supplier) {
    const url = supplier._id ? `/api/suppliers/${supplier._id}` : '/api/suppliers';
    const method = supplier._id ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplier),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    return data;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />

      <label htmlFor="address">Address:</label>
      <textarea id="address" value={address} onChange={(event) => setAddress(event.target.value)} />

      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />

      <button type="submit">Save</button>
    </form>
  );
}

export default SupplierForm;
