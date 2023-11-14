import {createContext, useContext, useState} from "react";

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
    const [user, setUserToState] = useState({});

    return (
        <UserContext.Provider
            value={{
                user,
                setUser: (user) => {
                    setUserToState(user);
                },
            }}
        >
            {children}
        </UserContext.Provider>
    );
}