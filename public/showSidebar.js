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

    var ref = firebase.database().ref('users');
    ref.on('value',(function(snapshot){

    /** Side Panel display for desktop*/
    /** Inserting stored email to query users information */
    let users = snapshot.val();
    for (var userId in users) {
        var user = users[userId];
        var businessInfo = user.businessInfo;

        const markup =
        (`<br><li><b>Business Name:</b> ${businessInfo.businessName}<li>
          <li><b>Business Address:</b> ${businessInfo.businessAddress}<li>
          <li><b>Instagram:</b> ${businessInfo.instagramHandle}<li>
          <li><b>Website:</b> <a href="${businessInfo.website}">Visit Website</a><li>
          <li><b>Courses:</b> ${user.courses}<li> <br> <hr>`);
        document.querySelector('.displayInfoPane').insertAdjacentHTML('beforeend',markup);
    }
 
            
}))

/**Side Panel display for Mobile */
ref.on('value',(function(snapshot){
let users = snapshot.val();
for (var userId in users) {
    var user = users[userId];
    var businessInfo = user.businessInfo;

    const markup =
    (`<br><li><b>Business Name:</b> ${businessInfo.businessName}<li>
      <li><b>Business Address:</b> ${businessInfo.businessAddress}<li>
      <li><b>Instagram:</b> ${businessInfo.instagramHandle}<li>
      <li><b>Website:</b> <a href="${businessInfo.website}">Visit Website</a><li>
      <li><b>Courses:</b> ${user.courses}<li> <br> <hr>`);
    document.querySelector('.displayInfoPaneMobile').insertAdjacentHTML('beforeend',markup);
}       
}))

/**Functions for hamburger icon to hide and how side bar when going to mobile */
function showSidebar(){
    const sidebar = document.querySelector('.sideMapPanelMobile');
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sideMapPanelMobile');
    sidebar.style.display = 'none'
}

/**Counter For Map */

const counts = document.querySelectorAll(".countHeader");
const speed = 200;
var userCount = 0;

counts.forEach((counter) =>{

    ref.on('value',(function(snapshot){
        let users = snapshot.val();
        for (var userId in users) {
            var user = users[userId];
            if(user){
                userCount = userCount + 1;
            }
        }

    function upData(){
        const target= Number(userCount);
        const count = Number(counter.innerText);
        const increment = target/speed;
        if(count < target){
            counter.innerText = Math.floor(increment + count)
            setTimeout(upData,1);
        }
        else{
            counter.innerText = target;
        } 
   }
   upData();
    }))
})

