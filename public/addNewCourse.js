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

let test = document.getElementById('userInfoDisplay');
var courseValue = document.getElementById('newCourse');


var coursePasswordMap = new Map();
coursePasswordMap.set("halo", "Angel Lashes");
coursePasswordMap.set("master", "Mega Volume Online Masterclass");
coursePasswordMap.set("texture", "Wispy workshop");
coursePasswordMap.set("slay", "Mapping mastery");
coursePasswordMap.set("sweetie", "In person mega volume");
coursePasswordMap.set("cutie", "In person classic");
coursePasswordMap.set("welcomeretailer", "Retail Partner");
coursePasswordMap.set("bestie", "Uses Light Heart Products");


 test.addEventListener('submit', function(event){
     event.preventDefault();

     var ref = firebase.database().ref('users');
     var sessionStore = sessionStorage.getItem('userLoginEmail');
     var localStore = localStorage.getItem('userLoginEmail');
     var formEmail;

     if((sessionStore === null) || (sessionStore === undefined)){
        formEmail = localStore;
     }
     else{
        formEmail = sessionStore;
     }

     document.getElementById('email').textContent = formEmail;
     let temp = courseValue.value.toLowerCase();

     ref.once('value').then( function(snapshot){
        let users = snapshot.val();
        var testDataBase_ref = database.ref();

        for(var userId in users){
            var user = users[userId];
            var businessInfo = user.businessInfo;
            
            try{
            if(businessInfo.email !== undefined && businessInfo.email === formEmail){
                var passMap = coursePasswordMap.get(temp);
                
                if(passMap == user.courses[0] ||
                    passMap == user.courses[1] ||
                    passMap == user.courses[2] ||
                    passMap == user.courses[3] ||
                    passMap == user.courses[4] ||
                    passMap == user.courses[5] ||
                    passMap == user.courses[6] ||
                    passMap == user.courses[7]){
                        console.log(`Course Already Exists in your Profile`);
                }

                else{
                    var numHold;
                    for(let i = 0; i< user.courses.length; i++){
                        
                        numHold = i;
                        console.log(`Inside For loop ${numHold}`);
                    }
                    console.log(formEmail);

                    switch(numHold){
                        case 0:
                        testDataBase_ref.child('users/' + userId + '/courses').update({1: passMap},(error)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log('Successful ')
                        }
                    });
                        break;

                        case 1:
                        testDataBase_ref.child('users/' + userId + '/courses').update({2: passMap},(error)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log('Successful ')
                        }
                    });
                        break;

                        case 2:
                            testDataBase_ref.child('users/' + userId + '/courses').update({3: passMap},(error)=>{
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log('Successful ')
                                }
                            });
                        break;

                        case 3:
                            testDataBase_ref.child('users/' + userId + '/courses').update({4: passMap},(error)=>{
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log('Successful ')
                                }
                            });
                        break;

                        case 4:
                            testDataBase_ref.child('users/' + userId + '/courses').update({5: passMap},(error)=>{
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log('Successful ')
                                }
                            });
                        break;

                        case 5:
                            testDataBase_ref.child('users/' + userId + '/courses').update({6: passMap},(error)=>{
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log('Successful ')
                                }
                            });
                        break;

                        case 6:
                            testDataBase_ref.child('users/' + userId + '/courses').update({7: passMap},(error)=>{
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log('Successful ')
                                }
                            });
                        break;

                        case 7:
                            testDataBase_ref.child('users/' + userId + '/courses').update({8: passMap},(error)=>{
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log('Successful ')
                                }
                            });
                        break;
                    }
            }
            }
        }catch(e){
            return console.log(e);
        }
        }
     })
})