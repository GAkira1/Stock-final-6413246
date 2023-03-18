import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import '../styles/HomePage.css';


interface Supplier {
  _id: string;
  supplierName: string;
  address: string;
  phoneNumber: string;
}

interface HomePageProps {
  suppliers: Supplier[];
}

const HomePage: React.FC<HomePageProps> = ({ suppliers }) => {
  return (
    <>
      <Head>
        <title>Suppliers Management</title>
      </Head>
      <div className="container">
        <h1>Suppliers Management System</h1>
        <Link href="/supplier">
          <a>Add New Supplier</a>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>
                  <Link href={`/supplier/${supplier._id}`}>
                    <a className="link">{supplier.supplierName}</a>
                  </Link>
                </td>
                <td>{supplier.address}</td>
                <td>{supplier.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add more links to different pages as needed */}
      </div>
    </>
  );
};

export default HomePage;

