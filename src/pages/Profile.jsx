import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Package, MapPin, LogOut, ChevronRight, CheckCircle2, Save, X } from 'lucide-react';
import { useUser } from '../hooks/useUser';


const Profile = () => {
  const { profile, updateProfile } = useUser();
  const [notification, setNotification] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const [isCountryOpen, setIsCountryOpen] = useState(false);


  const COUNTRY_CODES = [
    { code: '+63', flag: '🇵🇭', label: 'PH' }, // Philippines
    { code: '+1', flag: '🇺🇸', label: 'US' },  // USA / Canada
    { code: '+44', flag: '🇬🇧', label: 'UK' }, // United Kingdom
    { code: '+61', flag: '🇦🇺', label: 'AU' }, // Australia
    { code: '+65', flag: '🇸🇬', label: 'SG' }, // Singapore
    { code: '+81', flag: '🇯🇵', label: 'JP' }, // Japan
    { code: '+82', flag: '🇰🇷', label: 'KR' }, // South Korea
    { code: '+852', flag: '🇭🇰', label: 'HK' }, // Hong Kong
    { code: '+971', flag: '🇦🇪', label: 'AE' }, // UAE
    { code: '+33', flag: '🇫🇷', label: 'FR' }, // France
    { code: '+49', flag: '🇩🇪', label: 'DE' }, // Germany
    { code: '+39', flag: '🇮🇹', label: 'IT' }, // Italy
    { code: '+60', flag: '🇲🇾', label: 'MY' }, // Malaysia
    { code: '+62', flag: '🇮🇩', label: 'ID' }, // Indonesia
    { code: '+66', flag: '🇹🇭', label: 'TH' }, // Thailand
    { code: '+86', flag: '🇨🇳', label: 'CN' }, // China
    { code: '+91', flag: '🇮🇳', label: 'IN' }, // India
    { code: '+886', flag: '🇹🇼', label: 'TW' }, // Taiwan
    { code: '+34', flag: '🇪🇸', label: 'ES' }, // Spain
    { code: '+41', flag: '🇨🇭', label: 'CH' }, // Switzerland
  ];

  const triggerNotice = (msg) => {
    setNotification(msg);
    // We keep it visible for 4 seconds to allow the progress bar to finish
    setTimeout(() => setNotification(""), 4000);
  };

  const handlePhoneChange = (e) => {
  
    const val = e.target.value.replace(/\D/g, '');
    // Constrain to 10 digits (standard for PH/US mobile after prefix)
    if (val.length <= 10) {
      setFormData({ ...formData, phone: val });
    }
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
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[250] w-[90%] max-w-sm">
          <div className="bg-brand-sage-dark text-white p-1 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in slide-in-from-top-8 duration-500">
            <div className="px-6 py-4 flex items-center gap-4">
              {/* Animated Icon Circle */}
              <div className="flex-shrink-0 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle2 size={16} className="text-brand-sage-dark" />
              </div>
              
              <div className="flex-grow">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-0.5">Success</p>
                <p className="text-xs font-serif italic text-white/90">{notification}</p>
              </div>

              <button onClick={() => setNotification("")} className="text-white/40 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>

            {/* Aesthetic Progress Bar */}
            <div className="h-0.5 bg-brand-primary/20 w-full">
              <div className="h-full bg-brand-primary animate-progress-shrink origin-left" />
            </div>
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
                {/* Add this inside the "isEditing" block, before the Shipping Address label */}
                <div className="grid grid-cols-1 gap-2">
      <label className="text-[10px] uppercase tracking-widest text-brand-primary font-bold">
        Phone Number
      </label>
      <div className="flex gap-2 relative">
        
        {/* CUSTOM COUNTRY PICKER */}
        <div className="relative">
          <div 
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className="h-full flex items-center gap-3 pl-4 pr-10 bg-brand-cream/20 border border-brand-sage-light/30 rounded-xl cursor-pointer hover:border-brand-primary transition-all text-sm font-serif text-brand-sage-dark min-w-[110px]"
          >
            {/* Find the flag. If profile.countryCode is missing, default to +63 emoji */}
            {/* Find the flag. If formData.countryCode is missing, default to the PH flag emoji */}
<span className="text-lg leading-none">
  {COUNTRY_CODES.find(c => c.code === formData.countryCode)?.flag || '🇵🇭'}
</span>
<span className="font-medium">{formData.countryCode || '+63'}</span>


            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-sage-dark/30">
              <ChevronRight size={14} className={`transition-transform duration-300 ${isCountryOpen ? '-rotate-90' : 'rotate-90'}`} />
            </div>
          </div>

          {/* DROPDOWN LIST */}
          {isCountryOpen && (
            <>
              {/* This backdrop ensures the menu closes when you click away */}
              <div className="fixed inset-0 z-[100]" onClick={() => setIsCountryOpen(false)} />
              
              <div className="absolute top-[calc(100%+8px)] left-0 min-w-[160px] bg-white border border-brand-sage-light/20 rounded-2xl shadow-xl z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="py-2 max-h-60 overflow-y-auto">
                  {COUNTRY_CODES.map((c) => (
                    <div 
                      key={c.code}
                      onClick={() => {
                        setFormData({ ...formData, countryCode: c.code });
                        setIsCountryOpen(false);
                      }}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-brand-cream/40 cursor-pointer transition-colors"
                    >
                      {/* Using a span with a specific font-family can help with emoji rendering */}
                      <span className="text-xl inline-block">{c.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-brand-sage-dark">{c.code}</span>
                        <span className="text-[9px] uppercase tracking-tighter text-brand-sage-dark/40">{c.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Numeric Input */}
        <input 
          type="text"
          inputMode="numeric"
          className="flex-1 p-4 bg-brand-cream/20 border border-brand-sage-light/30 rounded-xl outline-none focus:border-brand-primary transition-colors text-brand-sage-dark placeholder:text-brand-sage-dark/20"
          value={formData.phone || ""}
          onChange={handlePhoneChange}
          placeholder="917 123 4567"
        />
      </div>
      <p className="text-[9px] text-brand-sage-dark/40 italic ml-1">Numeric digits only, max 10 characters.</p>
    </div>

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
  <p className="text-[10px] uppercase tracking-widest text-brand-sage-dark/40 mb-2">Saved Details</p>
  <p className="text-sm text-brand-sage-dark font-medium mb-1">
    <span className="mr-2">
      {/* Fallback to PH flag if no code is saved in the profile yet */}
      {COUNTRY_CODES.find(c => c.code === profile.countryCode)?.flag || '🇵🇭'}
    </span>
    {profile.countryCode || '+63'} {profile.phone || "No phone saved"}
  </p>
  <p className="text-sm text-brand-sage-dark/80">{profile.address || "No address saved"}</p>
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