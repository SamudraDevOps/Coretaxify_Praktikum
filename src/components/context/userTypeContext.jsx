import { createContext, useState, useEffect, useContext } from "react";

const UserTypeContext = createContext();
export const UserTypeProvider = ({ children }) => {
    const savedUserType = localStorage.getItem("userType") || "Orang Pribadi";

    const [userType, setUserType] = useState(savedUserType);

    useEffect(() => {
        localStorage.setItem("userType", userType); 
    }, [userType]);

    console.log("UserTypeContext Provider:", userType);

    return (
        <UserTypeContext.Provider value={{ userType, setUserType }}>
            {children}
        </UserTypeContext.Provider>
    );
};

export const useUserType = () => useContext(UserTypeContext);
