import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

function Login({ providers }: any) {
  return (
    <div className="flex items-center justify-center bg-black min-h-screen">
      <div className="flex flex-col gap-y-5 items-center">
        {" "}
        <div>
          <img
            height={200}
            width={200}
            src="/svgs/spotify-logo.png"
            alt="spotify-logo"
          />
        </div>
        {Object.values(providers).map((provider: any) => (
          <div key={provider}>
            <button
              onClick={() => {
                signIn(provider.id, { callbackUrl: "/" });
              }}
              className="primary-btn"
            >
              Login with {provider?.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
