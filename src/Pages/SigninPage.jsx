import React from 'react'


function SigninPage() {

    async function handleClick() {
        window.location.href = "http://www.facebook.com/v11.0/dialog/oauth?response_type=code&client_id=579207406764914&redirect_uri=http://localhost:3000/facebookapp/callback&scope=public_profile%20user_posts%20user_friends%20user_photos%20user_photos&state=123";
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className="btn btn-primary btn-lg mt-5"
                type="button"
            >
                Login with facebook
            </button>
        </div>
    )
}

export default SigninPage
