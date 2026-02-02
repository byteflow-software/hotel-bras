"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface LogoContextType {
  logo: string;
  isLoading: boolean;
}

const LogoContext = createContext<LogoContextType>({
  logo: "/icon.png",
  isLoading: true,
});

export function useLogo() {
  return useContext(LogoContext);
}

interface LogoProviderProps {
  children: ReactNode;
  initialLogo?: string;
}

export function LogoProvider({ children, initialLogo }: LogoProviderProps) {
  const [logo, setLogo] = useState(initialLogo || "/icon.png");
  const [isLoading, setIsLoading] = useState(!initialLogo);

  useEffect(() => {
    if (!initialLogo) {
      fetch("/api/logo")
        .then((res) => res.json())
        .then((data) => {
          if (data.logo) {
            setLogo(data.logo);
          }
        })
        .catch(() => {
          // Keep default
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [initialLogo]);

  return (
    <LogoContext.Provider value={{ logo, isLoading }}>
      {children}
    </LogoContext.Provider>
  );
}
