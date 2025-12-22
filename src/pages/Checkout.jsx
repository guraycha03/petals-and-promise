import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle2, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../context/OrderContext';

import { useUser } from '../hooks/useUser';

// HELPER: Defined outside to keep the component pure
const generateOrderMetaData = () => ({
  orderId: `PP-${Math.floor(Math.random() * 90000) + 10000}`,
  orderDate: new Date().toLocaleDateString('en-PH', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
});

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { addOrder } = useOrders();
  const { profile } = useUser();

  const checkoutItems = location.state?.checkoutItems || [];
  const [showNotification, setShowNotification] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "", // This pulls the data you just saved in Profile
    address: profile.address || "",
    city: profile.city || "",
    postalCode: profile.postalCode || ""
  });

  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = 250;
  const total = subtotal + shipping;
  const [paymentMethod, setPaymentMethod] = useState('credit'); 


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Call helper inside the handler
    const { orderId, orderDate } = generateOrderMetaData();

    const newOrder = {
      id: orderId,
      date: orderDate,
      total: total,
      status: "Processing",
      items: checkoutItems,
      shippingAddress: `${form.address}, ${form.city}, ${form.postalCode}`
    };

    setTimeout(() => {
      addOrder(newOrder);
      setShowNotification(true);
      setIsProcessing(false);
      
      setTimeout(() => {
        clearCart(); 
        navigate('/orders');
      }, 2000);
    }, 1500);
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <h2 className="font-serif text-2xl mb-4 text-brand-sage-dark opacity-40">Your selection is empty</h2>
        <Link to="/cart" className="text-xs uppercase tracking-widest border-b border-brand-dark pb-1">Return to Bag</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6">
      {/* Success Notification Overlay */}
      {showNotification && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-white/90 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 size={40} className="text-brand-primary" />
            </div>
            <h2 className="font-serif text-3xl text-brand-sage-dark">Order Confirmed</h2>
            <p className="text-xs uppercase tracking-widest text-brand-sage-dark/60">Preparing your blooms with care...</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-sage-dark/60 hover:text-brand-primary transition-colors mb-4">
            <ArrowLeft size={14} /> Review Selection
          </Link>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Contact Information */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-brand-dark text-white text-[10px] flex items-center justify-center font-bold">1</span>
                <h2 className="font-serif text-2xl text-brand-sage-dark">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-brand-sage-dark/40 ml-1">Email Address</label>
                  <input 
                    required type="email" 
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="e.g. clara@petals.com" 
                    className="w-full bg-white border border-brand-sage-light/30 rounded-lg py-4 px-5 focus:border-brand-primary outline-none transition-all shadow-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-brand-sage-dark/40 ml-1">Phone Number</label>
                  <input 
                    required type="tel" 
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    placeholder="+63 9XX XXX XXXX" 
                    className="w-full bg-white border border-brand-sage-light/30 rounded-lg py-4 px-5 focus:border-brand-primary outline-none transition-all shadow-sm" 
                  />
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-brand-dark text-white text-[10px] flex items-center justify-center font-bold">2</span>
                <h2 className="font-serif text-2xl text-brand-sage-dark">Delivery Address</h2>
              </div>
              <div className="space-y-6">
                <input 
                  required type="text" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  placeholder="Full Name" 
                  className="w-full bg-white border border-brand-sage-light/30 rounded-lg py-4 px-5 focus:border-brand-primary outline-none transition-all shadow-sm" 
                />
                <input 
                  required type="text" 
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                  placeholder="Street Address / Building / House No." 
                  className="w-full bg-white border border-brand-sage-light/30 rounded-lg py-4 px-5 focus:border-brand-primary outline-none transition-all shadow-sm" 
                />
                <div className="grid grid-cols-2 gap-6">
                  <input 
                    required type="text" 
                    value={form.city}
                    onChange={(e) => setForm({...form, city: e.target.value})}
                    placeholder="City" 
                    className="w-full bg-white border border-brand-sage-light/30 rounded-lg py-4 px-5 focus:border-brand-primary outline-none transition-all shadow-sm" 
                  />
                  <input 
                    required type="text" 
                    value={form.postalCode}
                    onChange={(e) => setForm({...form, postalCode: e.target.value})}
                    placeholder="Postal Code" 
                    className="w-full bg-white border border-brand-sage-light/30 rounded-lg py-4 px-5 focus:border-brand-primary outline-none transition-all shadow-sm" 
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            {/* Payment Method */}
<section className="space-y-8">
  <div className="flex items-center gap-4">
    <span className="w-8 h-8 rounded-full bg-brand-dark text-white text-[10px] flex items-center justify-center font-bold">3</span>
    <h2 className="font-serif text-2xl text-brand-sage-dark">Payment Method</h2>
  </div>
  <div className="grid grid-cols-2 gap-4">
    {/* Credit / Debit Option */}
    <label className={`relative flex flex-col items-center gap-3 p-6 border-2 rounded-xl cursor-pointer transition-all ${
      paymentMethod === 'credit' 
      ? 'border-brand-primary bg-white' 
      : 'border-brand-sage-light/20 bg-white/50 opacity-60'
    }`}>
      <CreditCard size={20} className={paymentMethod === 'credit' ? 'text-brand-primary' : 'text-brand-sage-dark/40'} />
      <span className={`text-[10px] uppercase tracking-widest font-bold ${paymentMethod === 'credit' ? 'text-brand-dark' : 'text-brand-sage-dark/40'}`}>
        Credit / Debit
      </span>
      <input 
        type="radio" 
        name="payment" 
        className="absolute top-4 right-4 accent-brand-primary" 
        checked={paymentMethod === 'credit'}
        onChange={() => setPaymentMethod('credit')}
      />
    </label>

    {/* Cash on Delivery Option */}
    <label className={`relative flex flex-col items-center gap-3 p-6 border-2 rounded-xl cursor-pointer transition-all ${
      paymentMethod === 'cod' 
      ? 'border-brand-primary bg-white' 
      : 'border-brand-sage-light/20 bg-white/50 opacity-60'
    }`}>
      <Truck size={20} className={paymentMethod === 'cod' ? 'text-brand-primary' : 'text-brand-sage-dark/40'} />
      <span className={`text-[10px] uppercase tracking-widest font-bold ${paymentMethod === 'cod' ? 'text-brand-dark' : 'text-brand-sage-dark/40'}`}>
        Cash on Delivery
      </span>
      <input 
        type="radio" 
        name="payment" 
        className="absolute top-4 right-4 accent-brand-primary" 
        checked={paymentMethod === 'cod'}
        onChange={() => setPaymentMethod('cod')}
      />
    </label>
  </div>
</section>

            <button 
              disabled={isProcessing}
              className={`w-full py-6 text-[10px] uppercase tracking-[0.5em] font-bold flex items-center justify-center gap-3 transition-all rounded-full shadow-2xl ${
                isProcessing ? 'bg-brand-primary/40 text-white cursor-wait' : 'bg-brand-dark text-white hover:bg-brand-primary'
              }`}
            >
              {isProcessing ? "Verifying Transaction..." : "Complete Order"} <Lock size={14} />
            </button>
            <p className="text-center text-[9px] uppercase tracking-widest text-brand-sage-dark/40 flex items-center justify-center gap-2">
              <ShieldCheck size={12} /> Encrypted & Secure Checkout
            </p>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-brand-sage-light/20 rounded-3xl p-8 sticky top-32 shadow-sm">
            <h3 className="font-serif text-2xl text-brand-sage-dark mb-8 border-b border-brand-sage-light pb-4">Order Summary</h3>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-6 mb-8 custom-scrollbar">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-brand-cream rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-serif text-sm text-brand-sage-dark">{item.name}</h4>
                    <p className="text-[10px] text-brand-sage-dark/40 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    <p className="text-xs font-bold mt-1">₱{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-brand-sage-light border-dashed">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-brand-sage-dark/60">
                <span>Items Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-brand-sage-dark/60">
                <span>Shipping Fee</span>
                <span>₱{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary">Total Amount</p>
                  <p className="text-3xl font-serif text-brand-sage-dark">₱{total.toLocaleString()}</p>
                </div>
                <div className="text-[9px] text-right text-brand-sage-dark/40 leading-tight">
                  VAT Included<br/>Digital Invoice sent to email
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;