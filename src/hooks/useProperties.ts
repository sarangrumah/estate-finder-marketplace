import { useState, useEffect } from 'react';
import { Property, Developer } from '../types';
import { mockProperties, mockDevelopers } from '../data/mockData';

const STORAGE_KEYS = {
  properties: 'sarangRumah_properties',
  developers: 'sarangRumah_developers'
};

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);

  // Load data from localStorage or use mock data
  useEffect(() => {
    const savedProperties = localStorage.getItem(STORAGE_KEYS.properties);
    const savedDevelopers = localStorage.getItem(STORAGE_KEYS.developers);

    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      setProperties(mockProperties);
    }

    if (savedDevelopers) {
      setDevelopers(JSON.parse(savedDevelopers));
    } else {
      setDevelopers(mockDevelopers);
    }
  }, []);

  // Save properties to localStorage
  const saveProperties = (newProperties: Property[]) => {
    setProperties(newProperties);
    localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(newProperties));
  };

  // Save developers to localStorage
  const saveDevelopers = (newDevelopers: Developer[]) => {
    setDevelopers(newDevelopers);
    localStorage.setItem(STORAGE_KEYS.developers, JSON.stringify(newDevelopers));
  };

  // Add property
  const addProperty = (propertyData: Omit<Property, 'id' | 'status' | 'soldUnits' | 'createdAt' | 'updatedAt'>) => {
    const newProperty: Property = {
      id: Date.now().toString(),
      ...propertyData,
      status: 'available' as const,
      soldUnits: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedProperties = [...properties, newProperty];
    saveProperties(updatedProperties);
    return newProperty;
  };

  // Update property
  const updateProperty = (id: string, propertyData: Partial<Property>) => {
    const updatedProperties = properties.map(p => 
      p.id === id 
        ? { ...p, ...propertyData, updatedAt: new Date().toISOString() }
        : p
    );
    saveProperties(updatedProperties);
  };

  // Delete property
  const deleteProperty = (id: string) => {
    const updatedProperties = properties.filter(p => p.id !== id);
    saveProperties(updatedProperties);
  };

  // Add developer
  const addDeveloper = (developerData: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDeveloper: Developer = {
      id: Date.now().toString(),
      ...developerData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedDevelopers = [...developers, newDeveloper];
    saveDevelopers(updatedDevelopers);
    return newDeveloper;
  };

  // Update developer
  const updateDeveloper = (id: string, developerData: Partial<Developer>) => {
    const updatedDevelopers = developers.map(d => 
      d.id === id 
        ? { ...d, ...developerData, updatedAt: new Date().toISOString() }
        : d
    );
    saveDevelopers(updatedDevelopers);
  };

  // Delete developer
  const deleteDeveloper = (id: string) => {
    const updatedDevelopers = developers.filter(d => d.id !== id);
    saveDevelopers(updatedDevelopers);
  };

  // Get property by ID
  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  // Get developer by ID
  const getDeveloperById = (id: string) => {
    return developers.find(d => d.id === id);
  };

  return {
    properties,
    developers,
    addProperty,
    updateProperty,
    deleteProperty,
    addDeveloper,
    updateDeveloper,
    deleteDeveloper,
    getPropertyById,
    getDeveloperById
  };
};