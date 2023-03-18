import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Suppliers Management System</h1>
      <p>
      </p>
      <ul>
        <li>
          <Link href="/supplier-management">
          </Link>
        </li>
        {/* Add more links to different pages as needed */}
      </ul>
    </div>
  );
}
