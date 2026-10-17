
import { SignUp } from '@clerk/react';

function CreateAccount() {
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
      <SignUp
        routing="hash"
        signInUrl="/login"
        forceRedirectUrl="/basic-details"
      />
    </div>
  );
}

export default CreateAccount;
