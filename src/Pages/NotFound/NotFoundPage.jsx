import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>متاسفیم! صفحه مورد نظر پیدا نشد.</p>
      <Link to="/" style={styles.link}>
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  },
  title: {
    fontSize: '6rem',
    color: '#343a40',
  },
  message: {
    fontSize: '1.5rem',
    color: '#6c757d',
  },
  link: {
    marginTop: '20px',
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NotFoundPage;
