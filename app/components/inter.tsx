import React from 'react'

export interface Lesson  {
  id: number;
  title: string;
  description: string;
  created_at: string;
  icon: string;
  color: string;
  status: string;
  progress: number;
};
