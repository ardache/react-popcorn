import { createContext } from 'react';

const MyContext = createContext({
    user: null,
    status_input: "false",
    updateStatus: () => {}
});

export default MyContext;