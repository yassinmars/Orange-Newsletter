
import axios from 'axios';

// Determine the API URL based on the current window location
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : `${window.location.origin}/api`;

console.log('Using API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });
    throw error;
  }
);

// Sample newsletters to use when API doesn't return any
const sampleNewsletters = [
  {
    id: 1,
    title: "Orange 5G Expansion - Coming to 50 New Cities",
    description: "Orange is expanding its 5G network coverage to 50 new cities across the country, bringing lightning-fast internet speeds to more customers than ever before.",
    image: "https://images.unsplash.com/photo-1610664921890-ebad05086414?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Network Operations Team",
    source: "Orange Technology Division",
    link: "https://www.orange.com/news/5g-expansion",
    status: "draft",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "New Family Plans - Save Up to 30% on Multiple Lines",
    description: "Introducing our new family plans that allow households to save up to 30% when connecting multiple lines under one account. Perfect for families of all sizes.",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Marketing Department",
    source: "Orange Customer Solutions",
    link: "https://www.orange.com/plans/family",
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "Orange Mobile App Redesign - Easier Than Ever",
    description: "We've completely redesigned our mobile app with a focus on simplicity and usability. Check your usage, pay bills, and manage your account with just a few taps.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "App Development Team",
    source: "Orange Digital Services",
    link: "https://www.orange.com/app",
    status: "sent",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    title: "Introducing Orange Business Cloud Solutions",
    description: "Orange Business Cloud Solutions offers enterprise-grade cloud infrastructure, security, and support for businesses of all sizes. Scale your IT resources as needed.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "B2B Solutions Team",
    source: "Orange Business Services",
    link: "https://business.orange.com/cloud",
    status: "draft",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    title: "Orange Summer Sale - Up to 50% Off Select Devices",
    description: "Take advantage of our biggest sale of the year with discounts of up to 50% on select smartphones, tablets, and accessories. Limited time only!",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Sales Team",
    source: "Orange Retail",
    link: "https://www.orange.com/summer-sale",
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 6,
    title: "Orange TV+ Launches New Original Series",
    description: "Orange TV+ is proud to announce three new original series premiering next month. Subscribe now to enjoy exclusive content you won't find anywhere else.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Content Team",
    source: "Orange Entertainment",
    link: "https://tv.orange.com/originals",
    status: "draft",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 7,
    title: "Orange Pay - The Secure Way to Pay Online",
    description: "Introducing Orange Pay, our new secure payment system that works seamlessly across all Orange services and partner websites. Enjoy fast, safe transactions.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Fintech Team",
    source: "Orange Financial Services",
    link: "https://pay.orange.com",
    status: "sent",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 8,
    title: "Sustainability Report: Orange's Path to Carbon Neutrality",
    description: "Read our latest sustainability report detailing Orange's commitment to becoming carbon neutral by 2030 and the steps we're taking to get there.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Sustainability Office",
    source: "Orange Corporate Affairs",
    link: "https://www.orange.com/sustainability",
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 9,
    title: "Orange Smart Home - Control Your Home from Anywhere",
    description: "Orange Smart Home allows you to control your lights, thermostat, security system, and more, all from your smartphone. Upgrade to a smarter home today.",
    image: "https://images.unsplash.com/photo-1558002038-1055e2e89a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "IoT Team",
    source: "Orange Smart Solutions",
    link: "https://www.orange.com/smart-home",
    status: "draft",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 10,
    title: "Orange Career Day - Join Our Growing Team",
    description: "Looking for your next career move? Join us at Orange Career Day to learn about exciting opportunities in technology, customer service, marketing, and more.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "HR Team",
    source: "Orange Careers",
    link: "https://careers.orange.com/events",
    status: "sent",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getNewsletters = async () => {
  try {
    console.log('Fetching newsletters...');
    const response = await api.get('/newsletters');
    console.log('Newsletters response:', response.data);
    
    // Check if response.data is an HTML string (backend issue) or empty
    if (
      typeof response.data === 'string' || 
      !response.data || 
      (Array.isArray(response.data) && response.data.length === 0)
    ) {
      console.log('Invalid or empty response, using sample data');
      return sampleNewsletters;
    }
    
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch newsletters:', error);
    console.log('Error fetching newsletters, using sample data');
    return sampleNewsletters;
  }
};

export const createNewsletter = async (newsletter: any) => {
  try {
    const response = await api.post('/newsletters', newsletter);
    return response.data;
  } catch (error) {
    console.error('Failed to create newsletter:', error);
    throw error;
  }
};

export const updateNewsletter = async (id: number, updates: any) => {
  try {
    const response = await api.put(`/newsletters/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Failed to update newsletter:', error);
    throw error;
  }
};

export const deleteNewsletter = async (id: number) => {
  try {
    await api.delete(`/newsletters/${id}`);
  } catch (error) {
    console.error('Failed to delete newsletter:', error);
    throw error;
  }
};

export default api;
