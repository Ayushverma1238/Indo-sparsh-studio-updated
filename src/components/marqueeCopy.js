import { createContext, useContext } from "react";

// Each copy of a marquee's items gets its own index, so a card can tell which
// copy it is. That lets the on-screen card light up without lighting its twin.
export const MarqueeCopyContext = createContext(0);

export const useMarqueeCopy = () => useContext(MarqueeCopyContext);
