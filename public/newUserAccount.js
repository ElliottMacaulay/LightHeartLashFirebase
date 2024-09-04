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
var form = document.getElementById("businessForm");

window.onload = function () {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        var coursePasswordMap = new Map();
        coursePasswordMap.set("master", "Mega Volume Online Masterclass");
        coursePasswordMap.set("halo", "Angel Lashes");
        coursePasswordMap.set("slay", "Mapping mastery");
        coursePasswordMap.set("texture", "Wispy workshop");
        coursePasswordMap.set("cutie", "In person classic");
        coursePasswordMap.set("sweetie", "In person mega volume");
        coursePasswordMap.set("bestie", "Uses Light Heart Products");
        coursePasswordMap.set("welcomeretailer", "Retail Partner");
        coursePasswordMap.set("", "");

        var userEmail = document.getElementById("userEmail").value;
        // var userPassword = document.getElementById("userPassword").value;
        var businessName = document.getElementById("businessName").value;
        var website = document.getElementById("website").value;
        var instagramHandle = document.getElementById("instagramHandle").value;
        var businessAddress = document.getElementById("businessAddress").value;
        var secretCode = document.getElementById("secretCode").value;

        var coursePassGet = coursePasswordMap.get(secretCode);

        var businessInfo = {
            businessName: businessName,
            website: website,
            instagramHandle: instagramHandle,
            businessAddress: businessAddress,
            // userId: userId,
            email: userEmail
        };
        var newUserCourse = {
            0: coursePassGet
        };

        // var geocoder = new google.maps.Geocoder();
        // var geocodeResult = await geocodeAddress(geocoder, businessAddress);
        //     businessInfo.businessLocation = { lat: geocodeResult.lat(), lng: geocodeResult.lng() };


        function geocodeAddress(geocoder, address) {
            return new Promise((resolve, reject) => {
              geocoder.geocode({ 'address': address }, function(results, status) {
                if (status === 'OK') {
                  resolve(results[0].geometry.location);
                } else {
                  reject(status);
                }
              });
            });
          }

        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        if (isValidEmail(userEmail)) {
            var actionCodeSettings = {
                url: 'http://lightheartlashdb.web.app/userProfile.html', // URL to redirect to after email verification
                handleCodeInApp: true,
            };

            try {
                var ref = firebase.database().ref('users');
                ref.once('value').then(function (snapshot) {
                    let users = snapshot.val();
                    for (var userId in users) {
                        var user = users[userId];
                        var userInfo = user.businessInfo;
                        try {
                            if (userInfo.email !== undefined && userInfo.email === userEmail) {
                                alert("Account Already Exists");
                                var emailStorage = userEmail;
                                sessionStorage.setItem('userLoginEmail', emailStorage);
                                localStorage.setItem('userLoginEmail', emailStorage);
                                
                                return;
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    var newPostKey = firebase.database().ref().child('users').push().key;
                    firebase.database().ref('users/' + newPostKey).set({
                        businessInfo: businessInfo,
                        courses: newUserCourse
                    }, function (error) {
                        if (error) {
                            console.log('Data Could Not Be Saved', error);
                            alert("Error: Your submission could not be processed. Please try again later.");
                        } else {
                            console.log('Data saved successfully!');
                            alert("Your submission was successful!");
                            var emailStorage = userEmail;
                            sessionStorage.setItem('userLoginEmail', emailStorage);
                            //localStorage.setItem('userLoginEmail', emailStorage);
                        }
                    });
                });

                // Send the sign-in link to the user's email
                await firebase.auth().sendSignInLinkToEmail(userEmail, actionCodeSettings);
                alert("An email has been sent to your email address. Please click the link to complete your Login");

                // Save user's email to localStorage
                sessionStorage.setItem('userLoginEmail', userEmail);
            } catch (error) {
                console.error("Error:", error.message);
                alert("Error:", error.message);
            }

            if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
                var storedEmail = sessionStorage.getItem('userLoginEmail');
                if (!storedEmail) {
                    storedEmail = prompt('Please provide your email for confirmation');
                }

                // Sign in the user with the email link
                firebase.auth().signInWithEmailLink(storedEmail, window.location.href)
                    .then((result) => {
                        // Redirect the user to the desired destination
                        window.location.href = "userProfile.html";
                    })
                    .catch((error) => {
                        console.error("Error:", error.message);
                        alert("Error:", error.message);
                    });
            }
        } else {
            alert("Invalid email address");
        }
    });
}