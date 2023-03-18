import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to my Stock Management System</h1>
      <p>
        This application helps you manage your inventory and suppliers. Use the
        navigation bar or the links below to access different pages:
      </p>
      <ul>
        <li>
          <Link href="/supplier-management">
            <a>Supplier Management</a>
          </Link>
        </li>
        {/* Add more links to different pages as needed */}
      </ul>
    </div>
  );
}
