import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext'; // Import from the new file

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('pp-user-v1');
    return saved ? JSON.parse(saved) : {
      name: "Eleanor Rigby",
      email: "eleanor@example.com",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      memberSince: "December 2025"
    };
  });

  useEffect(() => {
    localStorage.setItem('pp-user-v1', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (newData) => {
    setProfile(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};