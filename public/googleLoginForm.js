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
    var googleFormEmail = sessionStorage.getItem('userLoginEmail');
    document.getElementById('googleEmailLabel').textContent = googleFormEmail;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        var coursePasswordMap = new Map();
        coursePasswordMap.set("master", "Mega Volume Online Masterclass");
        coursePasswordMap.set("halo", "Angel Lashes");
        coursePasswordMap.set("slay", "Mapping mastery");
        coursePasswordMap.set("texture", "Wispy workshop");
        coursePasswordMap.set("cutie", "In person classic");
        coursePasswordMap.set("sweetie", "In person mega volume");

        //var userEmail = document.getElementById("googleEmailLabel"). value;
        //var userPassword = document.getElementById("userPassword").value;
        var businessName = document.getElementById("businessName").value;
        var website = document.getElementById("website").value;
        var instagramHandle = document.getElementById("instagramHandle").value;
        var businessAddress = document.getElementById("businessAddress").value;
        var secretCode = document.getElementById("secretCode").value;

        var coursePassGet = coursePasswordMap.get(secretCode);

        var businessInfoT = {
            businessName: businessName,
            website: website,
            instagramHandle: instagramHandle,
            businessAddress: businessAddress,
            //userId: userId,
            email: googleFormEmail
        };
        var newUserCourse = {
            0: coursePassGet
        };

        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        var ref = firebase.database().ref('users');
        ref.once('value').then(function (snapshot) {
            // let users = snapshot.val();
            // for (var userId in users) {
            //     var user = users[userId];
            //     var businessInfo = user.businessInfo;
                try {
                        if (isValidEmail(googleFormEmail)) {
                            var newPostKey = firebase.database().ref().child('users').push().key;
                            firebase.database().ref('users/' + newPostKey).set({
                                businessInfo: businessInfoT,
                                courses: newUserCourse
                            },
                                function (error) {
                                    if (error) {
                                        console.log('Data Could Not Be Saved', error);
                                        alert("Error: Your submission could not be processed. Please try again later.");

                                    } else {
                                        console.log('Data saved successfully!');
                                        alert("Your submission was successful!");  // Show confirmation message
                                        var emailStorage = googleFormEmail;
                                        sessionStorage.setItem('userLoginEmail', emailStorage);
                                        window.location.href = "userProfile.html";

                                    }
                                });

                            alert("Account Created Successfully", user);


                        }
                        else {
                            alert("Invalid email address");
                        }
                    //}
                } catch (e) {
                    return console.log(e);
                }
            //}
        })

    })

}

