import { createContext } from 'react';

const MyContext = createContext({
    user: null,
    branch: "",
    updateBranch: () => {}
});

export default MyContext;