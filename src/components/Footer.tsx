import { TEXT } from '@/constants';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 text-center text-gray-500 text-sm">
      <p>{TEXT.FOOTER.MESSAGE}</p>
    </footer>
  );
};

export default Footer;