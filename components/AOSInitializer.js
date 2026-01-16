'use client';

import { useEffect } from 'react';
import 'aos/dist/aos.css'
export default function AOSInitializer() {
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init();
    });
  }, []);

  return null;
}