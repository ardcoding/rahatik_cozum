"use client"
import { useState } from 'react';

export function useExpandableGroups() {
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggle = (key) => {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return [expandedGroups, toggle];
}
