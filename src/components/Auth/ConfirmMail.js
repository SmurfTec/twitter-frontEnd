import Axios from 'axios';
import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/constants';

import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';

const ConfirmEmail = ({ match, history }) => {
   const { setUser, setToken } = useContext(UserContext);
   React.useEffect(() => {
      (async () => {
         try {
            const res = await Axios.get(
               `${API_BASE_URL}/users/confirmMail/${match.params.activationToken}`
            );

            const { token, user } = res.data;

            toast.success(
               `Your account is Successfully Activated...Logging In`,
               {
                  position: 'top-right',
                  //  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               }
            );

            setTimeout(() => {
               localStorage.setItem('jwt', token);
               localStorage.setItem('user', JSON.stringify(user));
               setUser(user.data);
               setToken(token);
            }, 2000);
            history.push('/');
            // dispatch({ type: 'LOGIN', data: result.data });
            // setTimeout(() => (window.location.href = '/'), 3000);
         } catch (err) {
            console.log('err', err);
         }
      })();
   }, []);
   return <div></div>;
};

export default withRouter(ConfirmEmail);
