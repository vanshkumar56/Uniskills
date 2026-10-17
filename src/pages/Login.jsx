
import { SignIn } from '@clerk/react';

function Login() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        background: '#f5f7fb',
      }}
    >
      <SignIn
        routing="hash"
        signUpUrl="/create-account"
        forceRedirectUrl="/student/step-1"
        signUpForceRedirectUrl="/basic-details"
      />
    </div>
  );
}

export default Login;
