import { createContext, useContext, useState } from "react"

const SelectedAreasContext = createContext();

export const useSelectedAreas = () => {
    return useContext(SelectedAreasContext);
}

export const SelectedAreasProvider = ({children}) => {
    const [selectedAreas, setSelectedAreas] = useState([]);

    return (
        <>
            <SelectedAreasContext.Provider value={{selectedAreas, setSelectedAreas}} >
                {children}
            </SelectedAreasContext.Provider>
        </>
    )
}