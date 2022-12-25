import './App.css';
// import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder ,AdminPortal, useAuthActions, AuthorizedContent, useAuthUser} from "@frontegg/react";


function App() {
  //const { user } = useAuthUser();
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const handleClick = () => { AdminPortal.show();};
  const { switchTenant } = useAuthActions();
  const handleSwitchTenant = () => {  switchTenant({ tenantId: 'new-tenant-id' });
};

  // Uncomment this to redirect to login automatically
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, loginWithRedirect]);
  
  const logout = () => {
   const baseUrl = ContextHolder.getContext().baseUrl;
   window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  return (
    <div className="App">
      { isAuthenticated ? (
        <div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name}/>
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
          <button onClick={handleClick}>Settings</button>
            </div>
            <AuthorizedContent requiredRoles={['admin']} >
          <div>
              Private area for admins - go away
          </div>
      </AuthorizedContent>
     
            <div>
           <button onClick={handleSwitchTenant}>Select Active Tenant</button>
        
            </div>
          <div>
            <button onClick={() => console.log(user.accessToken)}>What is my access token?</button>
          </div>
          
                    <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
        </div>
        
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
    
    
  );
}

export default App;