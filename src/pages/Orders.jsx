import React from 'react';
import { Package, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const Orders = () => {
  const { orders } = useOrders();

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Shipped': return <Truck size={16} className="text-blue-500" />;
      case 'Delivered': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Package size={16} className="text-brand-primary" />;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-48 text-center px-6">
        <h2 className="font-serif text-2xl text-brand-sage-dark/40 mb-4">No orders found</h2>
        <Link to="/collections" className="text-xs uppercase tracking-widest border-b border-brand-dark pb-1">Begin Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/profile" className="flex items-center gap-2 text-brand-sage-dark/60 hover:text-brand-primary transition-colors text-[10px] uppercase tracking-widest mb-8">
          <ArrowLeft size={14} /> Account Overview
        </Link>
        <h1 className="font-serif text-4xl text-brand-sage-dark mb-10">Purchase History</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-brand-sage-light/30 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-brand-sage-light/5 p-6 border-b border-brand-sage-light/30 flex flex-wrap justify-between items-center gap-4">
                 <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-sage-dark/40 mb-1">Order Identifier</p>
                    <p className="font-serif text-lg">{order.id}</p>
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brand-sage-light/50">
                   {getStatusIcon(order.status)}
                   <span className="text-[10px] uppercase tracking-widest font-bold">{order.status}</span>
                 </div>
              </div>
              <div className="p-6">
                 <div className="space-y-4">
                   {order.items.map((item, idx) => (
                     <div key={idx} className="flex gap-4 items-center">
                        <img src={item.image} alt="" className="w-12 h-16 object-cover rounded shadow-sm" />
                        <div>
                          <p className="text-sm font-serif text-brand-sage-dark">{item.name}</p>
                          <p className="text-[10px] uppercase tracking-widest text-brand-sage-dark/40">Quantity: {item.quantity}</p>
                        </div>
                     </div>
                   ))}
                 </div>
                 <div className="mt-8 pt-6 border-t border-brand-sage-light/20 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-sage-dark/40">Total Amount</p>
                      <p className="text-xl font-bold">₱{order.total.toLocaleString()}</p>
                    </div>
                    <p className="text-[10px] text-brand-sage-dark/40 italic">{order.date}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;