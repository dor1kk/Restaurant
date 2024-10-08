import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Navbar from '../layout/navbar';
import DeliveryModal from '../forms/DeliveredDateForm';

const ActiveDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveredTime, setDeliveredTime] = useState('');
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch('http://localhost:8080/deliveries/completed-deliveries', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDeliveries(data);
      } catch (error) {
        console.error('Failed to fetch active deliveries:', error);
      }
    };

    fetchDeliveries();
  }, [authToken]);


 
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        {deliveries.length === 0 ? (
          <p>No active deliveries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 border-b">
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Driver ID</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Assigned Time</th>
                  <th className="py-2 px-4 text-left">Delivered Time</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.order_id} className="border-b">
                    <td className="py-2 px-4">{delivery.order_id}</td>
                    <td className="py-2 px-4">{delivery.driver_id}</td>
                    <td className="py-2 px-4">{delivery.delivery_status}</td>
                    <td className="py-2 px-4">${delivery.total_price}</td>
                    <td className="py-2 px-4">{new Date(delivery.assigned_time).toLocaleString()}</td>
                    <td className="py-2 px-4">{delivery.delivered_time ? new Date(delivery.delivered_time).toLocaleString() : 'Not Delivered'}</td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    
    </div>
  );
};

export default ActiveDeliveries;
