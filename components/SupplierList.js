import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    async function fetchSuppliers() {
      const response = await fetch('/api/suppliers');
      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      } else {
        console.error('Error fetching suppliers:', response.status);
      }
    }
    fetchSuppliers();
  }, []);

  return (
    <div>
      <h1>Suppliers</h1>
      <Link href="/suppliers/new">
        <button>+New Supplier</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.address}</td>
              <td>{supplier.phone}</td>
              <td>
                <Link href={`/suppliers/${supplier._id}`}>
                  <button>Update</button>
                </Link>
                {/* Add the delete functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierList;
