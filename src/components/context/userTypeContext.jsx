import { createContext, useState, useContext } from "react";

// Membuat Context
const UserTypeContext = createContext();

// Provider untuk membungkus aplikasi
export const UserTypeProvider = ({ children }) => {
    const [userType, setUserType] = useState("Orang Pribadi"); // Default "Orang Pribadi"
    console.log("UserTypeContext Provider:", userType);
    return (
        <UserTypeContext.Provider value={{ userType, setUserType }}>
            {children}
        </UserTypeContext.Provider>
    );
};

// Custom hook untuk menggunakan context
export const useUserType = () => useContext(UserTypeContext);
