
import { useAuthContext } from './useAuthContext';
import { useNotesContext } from './useNotesContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const {dispatch:notesDispatch}=useNotesContext()

    const logout = () => {
        // Remove user from storage
        localStorage.removeItem('user');

        // Dispatch logout action
        dispatch({ type: 'LOGOUT' });
        notesDispatch({
            type:"SET_NOTES",
            payload:null
        })
    };

    return { logout };
};
