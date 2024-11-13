import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const dark = useSelector((state) => state.darkMood);
  return (
    <div style={{ background: dark.bgLow, color: dark.textHigh,height: '100vh',display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'}}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>متاسفیم! صفحه مورد نظر پیدا نشد.</p>
      <Link to="/" style={styles.link}>
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

const styles = {

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
