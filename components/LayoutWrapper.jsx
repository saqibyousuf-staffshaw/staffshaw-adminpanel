'use client';

import { usePathname } from 'next/navigation';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Add all routes where you want to skip Navbar/Footer
  const excludedRoutes = ['/admin/dashboard'];

  const shouldExcludeLayout = excludedRoutes.some((path) => pathname.startsWith(path));

  return (
    <>

      
      {children}

    </>
  );
}
