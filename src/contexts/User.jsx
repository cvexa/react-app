import React, {useContext} from 'react';

const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);