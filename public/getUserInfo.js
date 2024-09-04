
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
var database = firebase.database(app);

/**Grabbing email from userLogin.html. Getting the email and outputting the instagram name */

window.onload = function () {

    /**User Info from query*/
    var headerBusName = document.getElementById('headerBusName');
    var busName = document.getElementById('businessName');
    var busAddress = document.getElementById('businessAddress');
    var userEmail = document.getElementById('email');
    var instaHandle = document.getElementById('instagramHandle');
    var userWebsite = document.getElementById('website');
    var userCourses = document.getElementById('courses');


    /**Restoring stored email from userLogin.html */
    // var formEmail = sessionStorage.getItem('userLoginEmail');
    // var localEmailStorage = localStorage.getItem('userLoginEmail').toLowerCase();

    // if(formEmail === null){
    //     document.getElementById('email').textContent = localEmailStorage;
    // }else{

    var sessionStore = sessionStorage.getItem('userLoginEmail');
    var localStore = localStorage.getItem('userLoginEmail');
    var formEmail;

    console.log(sessionStore);
    console.log(localStore);
    if ((sessionStore === null) || (sessionStore === undefined)) {
        formEmail = localStore;
    }
    else {
        formEmail = sessionStore;
    }
    document.getElementById('email').textContent = formEmail;
    //}

    var ref = firebase.database().ref('users');

    ref.on('value', (function (snapshot) {
        /** Inserting stored email to query users information */
        let users = snapshot.val();
        try {
            for (var userId in users) {
                var user = users[userId];
                var businessInfo = user.businessInfo;
                if (user && user.businessInfo && user.businessInfo.email) {
                    var email = user.businessInfo.email.toLowerCase();
                    if (email === formEmail) {//|| (email === localEmailStorage)) {
                        headerBusName.innerHTML = businessInfo.businessName;
                        busName.innerHTML = businessInfo.businessName;
                        busAddress.innerHTML = businessInfo.businessAddress;
                        userEmail.innerHTML = businessInfo.email;
                        instaHandle.innerHTML = businessInfo.instagramHandle;
                        userWebsite.innerHTML = businessInfo.website;
                        userCourses.innerHTML = user.courses;

                    }
                }

            }
        } catch (e) {
            return console.log(e);
        }

    }))
    var table = document.getElementById("userInfoTbl");
    var cells = table.getElementsByTagName('td');
    var header = table.getElementsByTagName('tr');

    /**Logic for User information Editable Table */

    for (let i = 0; i < cells.length; i++) {

        cells[i].onclick = function () {

            if (this.hasAttribute('data-clicked')) {
                return;
            }


            this.setAttribute('data-clicked', 'yes');
            this.setAttribute('data-text', this.innerHTML);

            //Prohibits the change of user courses
            if (cells[i].id != "courses") {
                var input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.value = this.innerHTML;
            }


            input.onblur = function () {
                var tableData = input.parentElement;
                var ogText = input.parentElement.getAttribute('data-text');
                var currentText = this.value;

                ref.once('value').then(function (snapshot) {
                    var testDataBase_ref = database.ref();
                    /** Inserting stored email to query users information */
                    let users = snapshot.val();
                    for (var userId in users) {

                        if (ogText != currentText) {

                            var user = users[userId];
                            var businessInfo = user.businessInfo;
                            var temp = cells[i].id;

                            tableData.removeAttribute('data-clicked');
                            tableData.removeAttribute('data-text');
                            tableData.innerHTML = currentText;

                            if (businessInfo.email === formEmail) {// || (businessInfo.email === localEmailStorage)) {

                                //switch statement used to trigger different object properties
                                switch (temp) {
                                    case 'businessName':
                                        testDataBase_ref.child('users/' + userId + '/businessInfo/').update({ businessName: currentText }, (error) => {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Successful ')
                                            }
                                        });
                                        break;

                                    case 'businessAddress':
                                        testDataBase_ref.child('users/' + userId + '/businessInfo/').update({ businessAddress: currentText }, (error) => {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Successful ')
                                            }
                                        });
                                        break;

                                    case 'email':
                                        testDataBase_ref.child('users/' + userId + '/businessInfo/').update({ email: currentText }, (error) => {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Successful ')
                                            }
                                        });
                                        break;

                                    case 'instagramHandle':
                                        testDataBase_ref.child('users/' + userId + '/businessInfo/').update({ instagramHandle: currentText }, (error) => {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Successful ')
                                            }
                                        });
                                        break;

                                    case 'website':
                                        testDataBase_ref.child('users/' + userId + '/businessInfo/').update({ website: currentText }, (error) => {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Successful ')
                                            }
                                        });
                                        break;

                                    case 'courses':
                                        testDataBase_ref.child('users/' + userId + '/businessInfo/').update({ courses: currentText }, (error) => {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Successful ')
                                            }
                                        });
                                        break;
                                }

                            }
                        }
                        else {
                            tableData.removeAttribute('data-clicked');
                            tableData.removeAttribute('data-text');
                            tableData.innerHTML = ogText;
                        }
                    }
                })
            }

            input.onkeydown = function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    this.blur();
                }
            };

            this.innerHTML = '';
            this.append(input);
            this.firstElementChild.select();
        }
    }
    // window.onbeforeunload = function () {
    //     localStorage.removeItem('userLoginEmail');
    // };
}
