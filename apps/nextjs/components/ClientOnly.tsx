'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';

export const ClientOnly = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? <>{children}</> : null;
};
