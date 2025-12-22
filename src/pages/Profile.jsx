import React from 'react';
import { User, Mail, Settings, Package, MapPin, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
  const user = {
    name: "Eleanor Rigby",
    email: "eleanor@example.com",
    memberSince: "December 2024"
  };

  const profileActions = [
    { icon: <Package size={20} />, label: "My Orders", description: "Track, return, or buy again" },
    { icon: <MapPin size={20} />, label: "Shipping Addresses", description: "Edit your delivery locations" },
    { icon: <Settings size={20} />, label: "Account Settings", description: "Update password and preferences" },
  ];

  return (
    // Ensure bg-white is present to cover the home page content
    <div className="pt-32 pb-20 min-h-screen bg-white relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-6">
            {/* Profile Image Container */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-brand-sage-light/30 overflow-hidden bg-white shadow-xl flex items-center justify-center text-brand-sage-dark relative z-10">
              <img 
                src="../images/profile-img.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <User size={60} strokeWidth={1} className="absolute z-0 opacity-20" />
            </div>
            {/* Settings Button outside the overflow-hidden container */}
            <button className="absolute bottom-1 right-1 bg-brand-primary text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-20 border-2 border-white">
              <Settings size={18} />
            </button>
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-brand-primary font-medium mb-4 block">
            Welcome Back
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-2 uppercase tracking-tight">
            {user.name}
          </h1>
          <p className="text-brand-sage-dark/60 italic font-serif">
            Member of the House since {user.memberSince}
          </p>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-brand-sage-dark/40 font-bold mb-6 border-b border-brand-sage-light pb-2">
              Account Overview
            </h2>
            {profileActions.map((action, index) => (
              <button 
                key={index}
                className="w-all flex items-center justify-between p-6 bg-brand-sage-light/5 border border-brand-sage-light/20 rounded-xl hover:border-brand-primary/40 hover:bg-brand-sage-light/10 transition-all group text-left w-full"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-white rounded-full text-brand-sage-dark shadow-sm group-hover:text-brand-primary transition-colors">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-brand-sage-dark">{action.label}</h3>
                    <p className="text-sm text-brand-sage-dark/60">{action.description}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-brand-sage-dark/20 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-brand-sage-dark text-white rounded-2xl shadow-sm">
              <h3 className="font-serif text-xl mb-2">Need Assistance?</h3>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">Our atelier staff is available for consultations regarding your orders.</p>
              <button className="w-full py-3 bg-white text-brand-sage-dark text-[10px] uppercase tracking-[0.2em] font-bold rounded hover:bg-brand-sage-light transition-colors">
                Contact Concierge
              </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-4 text-red-400 hover:bg-red-50/50 transition-colors rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold">
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;