import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Package, MapPin, LogOut, ChevronRight, CheckCircle2, Save, X } from 'lucide-react';
import { useUser } from '../hooks/useUser';


const Profile = () => {
  const { profile, updateProfile } = useUser();
  const [notification, setNotification] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const triggerNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    triggerNotice("Profile Securely Updated");
  };

  const profileActions = [
    { icon: <Package size={20} />, label: "My Orders", path: "/orders", desc: "View history" },
    { icon: <MapPin size={20} />, label: "Addresses", path: "#", desc: "Manage locations" }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white relative">
      {notification && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-brand-sage-dark text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <CheckCircle2 size={18} className="text-brand-primary" />
            <span className="text-xs uppercase tracking-widest font-bold">{notification}</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-brand-sage-light/30 overflow-hidden bg-brand-cream/20 shadow-xl flex items-center justify-center text-brand-sage-dark">
              <User size={60} strokeWidth={1} className="opacity-20" />
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`absolute bottom-1 right-1 p-2.5 rounded-full shadow-lg transition-all z-20 border-2 border-white ${isEditing ? 'bg-red-400 text-white' : 'bg-brand-primary text-white'}`}
            >
              {isEditing ? <X size={18} /> : <Settings size={18} />}
            </button>
          </div>

          {isEditing ? (
            <div className="w-full max-w-sm space-y-4">
              <input 
                className="w-full text-center text-3xl font-serif border-b border-brand-primary outline-none py-1"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your Name"
              />
              <input 
                className="w-full text-center text-sm italic text-brand-sage-dark/60 border-b outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email Address"
              />
            </div>
          ) : (
            <>
              <span className="text-xs uppercase tracking-[0.3em] text-brand-primary font-medium mb-4 block">Welcome Back</span>
              <h1 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-2 uppercase tracking-tight">{profile.name}</h1>
              <p className="text-brand-sage-dark/60 italic font-serif">{profile.email}</p>
            </>
          )}
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-brand-sage-dark/40 font-bold border-b border-brand-sage-light pb-2">Details & Settings</h2>
            
            {isEditing ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 gap-4">
                  <label className="text-[10px] uppercase tracking-widest text-brand-primary font-bold">Shipping Address</label>
                  <input 
                    className="w-full p-4 bg-brand-cream/20 border border-brand-sage-light/30 rounded-xl outline-none focus:border-brand-primary"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      className="p-4 bg-brand-cream/20 border border-brand-sage-light/30 rounded-xl outline-none"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="City"
                    />
                    <input 
                      className="p-4 bg-brand-cream/20 border border-brand-sage-light/30 rounded-xl outline-none"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleSave}
                  className="w-full py-4 bg-brand-dark text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary transition-colors"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {profileActions.map((action, i) => (
                  <Link key={i} to={action.path} className="flex items-center justify-between p-6 bg-brand-sage-light/5 border border-brand-sage-light/20 rounded-xl hover:bg-brand-sage-light/10 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="p-3 bg-white rounded-full text-brand-sage-dark shadow-sm group-hover:text-brand-primary transition-colors">{action.icon}</div>
                      <div>
                        <h3 className="font-serif text-lg text-brand-sage-dark">{action.label}</h3>
                        <p className="text-xs text-brand-sage-dark/40 uppercase tracking-widest">{action.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-brand-sage-dark/20 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
                <div className="p-6 bg-brand-cream/10 border border-dashed border-brand-sage-light rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-brand-sage-dark/40 mb-2">Saved Shipping Address</p>
                  <p className="text-sm text-brand-sage-dark/80">{profile.address || "No address saved. Click edit to update."}</p>
                  <p className="text-sm text-brand-sage-dark/80">{profile.city} {profile.postalCode}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-brand-sage-dark text-white rounded-2xl shadow-sm">
              <h3 className="font-serif text-xl mb-2">Concierge</h3>
              <p className="text-sm text-white/70 mb-6">Need to update your membership tier or request a custom gown?</p>
              <button className="w-full py-3 bg-white text-brand-sage-dark text-[10px] uppercase tracking-[0.2em] font-bold rounded">Contact Us</button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-4 text-red-400 text-[10px] uppercase tracking-[0.2em] font-bold">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;