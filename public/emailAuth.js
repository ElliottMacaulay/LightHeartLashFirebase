// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDKYTsPByglKMWhqrL_W-dSUHgDUXbm4Zg",
    authDomain: "lightheartlashdb.firebaseapp.com",
    databaseURL: "https://lightheartlashdb-default-rtdb.firebaseio.com",
    projectId: "lightheartlashdb",
    storageBucket: "lightheartlashdb.appspot.com",
    messagingSenderId: "187026496730",
    appId: "1:187026496730:web:686b35e7ccdda56d0bd9e3",
    measurementId: "G-8GRD32LYV9"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
//var database = firebase.database(app);

var submitFormBtn = document.getElementById("submit");
var form = document.getElementById("form");

window.onload = function () {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        var userEmail = document.getElementById("userLoginEmail").value;
        // var userPassword = document.getElementById("userLoginPassword").value;

        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        if (isValidEmail(userEmail)) {

            var ref = firebase.database().ref('users');
            ref.once('value').then(async function (snapshot) {
                let users = snapshot.val();
                var emailExists = false;
                for (var userId in users) {
                    var user = users[userId];
                    var businessInfo = user.businessInfo;
                    if (businessInfo && businessInfo.email === userEmail) {
                        emailExists = true;
                        break;
                    }
                }
                if (emailExists) {
                    var actionCodeSettings = {
                        url: 'http://lightheartlashdb.web.app/userProfile.html', // URL to redirect to after email verification
                        handleCodeInApp: true,
                    };

                    try {
                        // Send the sign-in link to the user's email
                        await firebase.auth().sendSignInLinkToEmail(userEmail, actionCodeSettings);
                        alert("An email has been sent to your email address. Check Spam/Junk if email not received. Please click the link to complete your registration.");

                        // Save user's email to sessionStorage
                        localStorage.setItem('userLoginEmail', userEmail);
                    } catch (error) {
                        console.error("Error:", error.message);
                        alert("Error:", error.message);
                    }

                    // if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
                    //     var storedEmail = sessionStorage.getItem('userLoginEmail');
                    //     if (!storedEmail) {
                    //         storedEmail = prompt('Please provide your email for confirmation');
                    //     }

                    //     // Sign in the user with the email link
                    //     firebase.auth().signInWithEmailLink(storedEmail, window.location.href)
                    //         .then((result) => {
                    //             // Clear the saved email


                    //             // Redirect the user to the desired destination
                    //             window.location.href = "userProfile.html";
                    //             //sessionStorage.removeItem('userLoginEmail');
                    //         })
                    //         .catch((error) => {
                    //             console.error("Error:", error.message);
                    //             alert("Error:", error.message);
                    //         });
                    // }
                } else {
                    alert("Email doesn't exist please try a different email, or create an account");
                }
            });
        } else {
            alert("Invalid Email Address");
        }
});
};

document.getElementById("googleButton").addEventListener('click', function (e) {
    e.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            // Handle errors
        });
});

firebase.auth().getRedirectResult()
    .then((result) => {
        if (result.credential) {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;

        }
        // The signed-in user info.
        var googleUser = result.user;
        console.log(googleUser.email);
        var ref = firebase.database().ref('users');
        ref.once('value').then(function (snapshot) {
            let users = snapshot.val();
            var userFound = false;
            for (var userId in users) {
                var user = users[userId];
                var businessInfo = user.businessInfo;

                try {
                    if (businessInfo.email !== 'undefined' && businessInfo.email === googleUser.email) {
                        console.log(`User found. User is: ${businessInfo.businessName}`);
                        console.log(`Email: ${businessInfo.email}`);
                        console.log(`Email: ${googleUser.email}`);
                        userFound = true;
                        break; // Exit the loop once user is found
                    }
                } catch (error) {
                    console.log(error);
                }


            }
            if (userFound) {
                var emailStorage = googleUser.email;
                sessionStorage.setItem('userLoginEmail', emailStorage);
                alert("Login Successful... Redirecting");
                window.location.href = "userProfile.html";
            } else {
                var emailStorage = googleUser.email;
                sessionStorage.setItem('userLoginEmail', emailStorage);
                window.location.href = "googleLoginForm.html";
            }

        })

    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

