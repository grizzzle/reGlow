import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { auth } from './firebase';

const LogbookContext = createContext();

export const LogbookProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const user = auth.currentUser;
    if (user) {
      const response = await axios.get('http://localhost:3000/logbookEntries', {
        params: { userId: user.uid }
      });
      setEntries(response.data);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <LogbookContext.Provider value={{ entries, fetchEntries }}>
      {children}
    </LogbookContext.Provider>
  );
};

export const useLogbook = () => useContext(LogbookContext);
