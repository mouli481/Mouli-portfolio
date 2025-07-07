'use client';
import resumeData from '@/data/resumeData';
import { useState } from 'react';

export default function ResumeEditForm() {
  const [formData, setFormData] = useState({
    name: resumeData.name,
    email: resumeData.email,
    phone: resumeData.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Resume updated! (Note: This is a demo; updates are not persisted.)');
    console.log('Updated Data:', formData);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '0 1rem',
      fontFamily: "'Inter', sans-serif",
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '1.5rem', textAlign: 'center' }}>Edit Resume</h1>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#4a5568', marginBottom: '0.5rem' }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.25rem',
              color: '#4a5568',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#4a5568', marginBottom: '0.5rem' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.25rem',
              color: '#4a5568',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#4a5568', marginBottom: '0.5rem' }}>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.25rem',
              color: '#4a5568',
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          style={{
            background: '#3182ce',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseOver={(e) => e.target.style.background = '#2b6cb0'}
          onMouseOut={(e) => e.target.style.background = '#3182ce'}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}