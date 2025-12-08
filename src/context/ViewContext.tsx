import { createContext, useContext, useState } from "react";

type ViewMode = "grid" | "list";

type ViewContextType = {
  viewMode: ViewMode;
  toggleView: () => void;
};

const ViewContext = createContext<ViewContextType | null>(null);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const toggleView = () => {
    setViewMode((p) => (p === "grid" ? "list" : "grid"));
  };

  return (
    <ViewContext.Provider value={{ viewMode, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => useContext(ViewContext)!;
