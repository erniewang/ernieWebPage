import * as msal from "@azure/msal-browser";

// Make the function async to use await inside
async function connectOnedrive() {
  const msalConfig = {
    auth: {
      clientId: "d2c531ce-d0fa-43d7-850e-dc408fd0498e", // Your app's client ID
      redirectUri: "http://localhost:3000", // Your app's redirect URI
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
    // Handle error, perhaps try acquireTokenPopup if silent fails
    if (error instanceof msal.InteractionRequiredAuthError || 
        error.errorCode === "user_login_error" || // Added for cases where silent might fail after a page reload before full init
        error.errorCode === "no_account_in_silent_request") { // If silent call fails due to no active account
      try {
        const loginResponse = await msalInstance.loginPopup(loginRequest); // Fallback to popup
        const accessTokenRequest = {
          account: loginResponse.account,
          scopes: ["Files.Read"]
        };
        return await msalInstance.acquireTokenSilent(accessTokenRequest); // Try silent again after popup
      } catch (popupError) {
        console.error("Error during popup login fallback:", popupError);
        throw popupError;
      }
    }
    throw error; // Re-throw other errors
  }
}

// --- How to use it (no changes here, but ensure it's called appropriately) ---
async function getMyOneDriveFiles() {
  try {
    const tokenResponse = await connectOnedrive(); // This now calls the async version

    if (tokenResponse && tokenResponse.accessToken) {
      const accessToken = tokenResponse.accessToken;
      console.log("Access Token Obtained!");

      const graphApiEndpoint = "https://graph.microsoft.com/v1.0/me/drive/root/children";

      const response = await fetch(graphApiEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Files in your OneDrive root:", data.value);
        return data.value;
      } else {
        console.error("Error fetching files:", response.status, await response.text());
        // Log the error response body for more details
        const errorBody = await response.text();
        console.error("Error response body:", errorBody);
      }
    }
  } catch (error) {
    console.error("Failed to get OneDrive files:", error);
  }
}

// To actually run it (e.g., when a user clicks a "Connect to OneDrive" button):
// document.getElementById('yourConnectButtonId').addEventListener('click', async () => {
//   await getMyOneDriveFiles();
// });

export { connectOnedrive, getMyOneDriveFiles };