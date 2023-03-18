import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function SupplierDetails() {
  const router = useRouter();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    async function fetchSupplier() {
      const { id } = router.query;
      const res = await fetch(`/api/suppliers/${id}`);
      const data = await res.json();
      setSupplier(data);
    }

    fetchSupplier();
  }, [router.query]);

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{supplier.name}</h1>
      <p>Address: {supplier.address}</p>
      <p>Phone: {supplier.phone}</p>
    </div>
  );
}

export default SupplierDetails;
