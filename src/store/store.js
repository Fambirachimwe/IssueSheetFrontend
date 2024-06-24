import createStore from 'react-auth-kit/createStore';

const store = createStore({
    authName: '_auth',
    authType: 'localStorage',
});

export default store