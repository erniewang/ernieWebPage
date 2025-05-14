import * as msal from "@azure/msal-browser";

function connectOnedrive() {
    const msalConfig = {
    auth: {
        clientId: "d2c531ce-d0fa-43d7-850e-dc408fd0498e",
        redirectUri: "https://localhost:3000/auth/callback",
    }
    };

    const msalInstance = new msal.PublicClientApplication(msalConfig);

    const loginRequest = { scopes: ["Files.Read"] };

    msalInstance.loginPopup(loginRequest)
    .then(resp => {
        const accessTokenRequest = {
        account: resp.account,
        scopes: ["Files.Read"]
        };
        return msalInstance.acquireTokenSilent(accessTokenRequest);
    })
    .then(tokenResp => {
        return tokenResp;
    });
}

async function fetchOnedrive(tokenResp) {
    fetch("https://graph.microsoft.com/v1.0/me/drive/root/children", {
        headers: {
            Authorization: `Bearer ${tokenResp.accessToken}`
        }
        })
    .then(res => res.json())
    .then(data => console.log(data));
}

export {connectOnedrive};