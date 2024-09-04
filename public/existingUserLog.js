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
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        var userEmail = document.getElementById("userEmail").value;
        //var userPassword = document.getElementById("userPassword").value;
        var businessName = document.getElementById("businessName").value;
        var instagramHandle = document.getElementById("instagramHandle").value;
        var businessAddress = document.getElementById("businessAddress").value;

        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }

        if (isValidEmail(userEmail)) {

            var ref = firebase.database().ref('users');
            ref.once('value').then(function (snapshot) {
                let users = snapshot.val();
                let accountFound = false;
                
                for (var userId in users) {
                    var user = users[userId];
                    var businessInfo = user.businessInfo;
                    try {
                        if (businessInfo.email !== undefined && 
                            businessInfo.email.toLowerCase() === userEmail.toLowerCase() &&
                            businessInfo.businessName.toLowerCase() === businessName.toLowerCase() &&
                            businessInfo.instagramHandle.toLowerCase() === instagramHandle.toLowerCase() &&
                            businessInfo.businessAddress.toLowerCase() === businessAddress.toLowerCase()) {
                            if (confirm(`User Found Is This Your Business? \n${businessInfo.businessName}\n${businessInfo.businessAddress}\n${businessInfo.email} \n${businessInfo.instagramHandle} \n${businessInfo.website}`) == true) {
                                  
                                //Creates Email and Password Logic
                                // firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
                                //     .then((userCredential) => {

                                       // const user = userCredential.user;
                                       // alert("Account Created" + user);  // Show confirmation message
                                        var emailStorage = userEmail;
                                        sessionStorage.setItem('userLoginEmail', emailStorage);
                                        window.location.href = "userProfile.html";
                                        alert("Account Found", user);

                                    //})
                                    // .catch((error) => {
                                    //     const errorcode = error.code;
                                    //     const errorMessage = error.message;
                                    //     console.error("Error:", errorMessage);
                                    //     alert(errorMessage);
                                    // })
                            }
                            accountFound = true;
                            break;
                        }

                    } catch (error) {
                        console.error("Error:", error.message);
                        alert("Error:", error.message);
                    }
                }
                if (!accountFound) {
                    alert("Account Not Found");
                }
            })
        }
        else {
            alert("Invalid email address");
        }

    })

}

