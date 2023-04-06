import React, { useState, useEffect } from 'react';
import { messages as defaultMessageList, images as defaultImageList } from './config';

type Props = {
  messages?: string[];
  images?: string[];
  styles?: React.CSSProperties;
};

const checkInternet = () => {
  if (typeof window === 'undefined') {
    return true;
  } else {
    return window.navigator.onLine;
  }
};

const getRandomItem = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)];
};

const NetworkNotifier: React.FC<Props> = ({ messages = defaultMessageList, images = defaultImageList, styles }) => {
  const [isOnline, setIsOnline] = useState(checkInternet());
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');

  const defaultStyles: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 9999,
    backgroundColor: 'linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)',
    borderRadius: '8px',
    padding: '32px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  useEffect(() => {
    const handleOffline = () => {
      const isConnected = checkInternet();
      setIsOnline(isConnected);

      if (!isConnected) {
        setMessage(getRandomItem(messages));
        setImage(getRandomItem(images));
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  if (!isOnline) {
    return (
      <div style={{ ...defaultStyles, ...styles }}>
        <img src={image} alt="Funny Image" style={{ maxWidth: '100%', maxHeight: '80vh', marginBottom: '16px' }} />
        <p style={{ fontSize: '18px', fontWeight: 500, lineHeight: '24px', marginBottom: 0 }}>{message}</p>
      </div>
    );
  }

  return null;
};

export default NetworkNotifier;
