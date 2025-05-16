import * as msal from "@azure/msal-browser";

// Make the function async to use await inside
async function connectOnedrive() {
  const msalConfig = {
    auth: {
      clientId: "d2c531ce-d0fa-43d7-850e-dc408fd0498e", // Your app's client ID
      redirectUri: "http://localhost:3000", //return address after authentication
    },
  };

  //create the login process
  const msalInstance = new msal.PublicClientApplication(msalConfig);
  await msalInstance.initialize();

  const loginRequest = {
    scopes: ["Files.Read"]
  };

  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest); //load in the login popup
    const accessTokenRequest = {
      account: loginResponse.account,
      scopes: ["Files.Read"]
    };
    const tokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest); //log in
    return tokenResponse;
  } catch (error) {
    console.error("Error during login or token acquisition:", error);
  }
}

// --- How to use it (no changes here, but ensure it's called appropriately) ---
async function getMyOneDriveFiles() {
    let tokenResponse = {};
    if (localStorage.getItem("graphSessionToken") === null) {
        tokenResponse = await connectOnedrive(); 
    }
    else {
        tokenResponse.accessToken = localStorage.getItem("graphSessionToken");
    }

    const accessToken = tokenResponse.accessToken;
    localStorage.setItem("graphSessionToken", accessToken);
    const graphApiEndpoint = "https://graph.microsoft.com/v1.0/me/drive/root/children";
    const response = await fetch(graphApiEndpoint, {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data.value[7]);
        return data.value[7];
    } else {
        console.error("problem", response.status, await response.text());
    }
}

async function getFilesByIndex([]) {

}
export { connectOnedrive, getMyOneDriveFiles };