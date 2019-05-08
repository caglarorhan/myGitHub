
//----------------------------------------------------------------------------------
     class gitProcs {
        constructor(userName){
            this.userName = userName;
            this.baseURL = "https://api.github.com";
            this.githubURL='https://www.github.com';
        }
        async getRepos() {
            const response = await fetch(this.baseURL+'/users/'+this.userName+'/repos');
            //console.log(this.baseURL+'/users/'+this.userName+'/repos')
            return await response.json(); //JSON objesi, return edildi

        }
        async getUserAvatar() {
            const response = await fetch(this.baseURL+'/users/'+this.userName);
            let avat = await response.json();
            return avat;
        }

        async getRepoCount(){
            const response = await fetch(this.baseURL+'/users/'+this.userName);
            let repoCount = await response.json();
            return repoCount;
        }


    }

    window.addEventListener('load',function(){
//--------------------------------------------------------------------------------------------------------------------
        // user control
        //chrome.storage.sync.clear();
       //return;

        chrome.storage.sync.get('userName', function(userData) {
            let userName = userData.userName;
            if(!userName || userName==='' || userName===undefined){
                let userNameDiv = document.getElementById('userNameDiv');
                let newUserName = document.getElementById('userName');
                let saveUserName = document.getElementById('saveUserName');

                userNameDiv.style.display="block";
                saveUserName.addEventListener('click',function(){
                    if(newUserName.value){
                        chrome.storage.sync.set({'userName': newUserName.value});
                        let notifOptions = {
                            type: 'basic',
                            iconUrl: './img/mygithub_32.png',
                            title: 'Username Saved!',
                            message: 'User name saved as '+newUserName.value+' to sync system!'
                        };
                        chrome.notifications.create('userNameSaved',notifOptions);
                        runForest(newUserName.value);
                        userNameDiv.style.display='none';
                    }else{
                        let notifOptions = {
                            type: 'basic',
                            iconUrl: './img/mygithub_32.png',
                            title: 'Username Problem!',
                            message: 'Please use proper user name. This must be your github user name!'
                        };
                        chrome.notifications.create('userNameProblem',notifOptions);
                    }
                })

            }else{
                runForest(userName);
            }


function runForest(userName){
    let gitt = new gitProcs(userName);
    let avatar = gitt.getUserAvatar().then( res => {
        document.querySelector('#avatarImg').innerHTML = `<img src='${res.avatar_url}' style="max-width: 64px; float:left; left:0;" title="${res.login}"><h2 style="float:left; left:70px" title="${res.login}"><a href="${res.html_url}" target="_blank">${res.name}</a></h2>`
    });

    let gitten = gitt.getRepos()
        .then( rsp => {
            let counter=Number(0);
            rsp.forEach((item)=> {
                document.querySelector('#ownerRepos').innerHTML+=`<b> ${++counter})</b> <a href="${(item.html_url)}" style="left:20px;" target="_blank">${item.name}</a></br>`;
            })
        })
        .catch(err => console.log(err));

}


        });



//------------------------------------------------------------------------------------------
//Storage Olayi
// chrome.storage.sync.get('degiskenAdi',function(storageTemsiliDegiskenAdi){
        // storageTemsiliDegiskenAdi.degiskenAdi //ile ulasiliyor kayirli veriye
// }); //callback sart -storage boyle kullaniliyor
// veri set ederken de, key value olan bir objeyi set edecegiz
// chrome.storage.sync.set({'degiskenAdi': yeniDeger})
// Birden fazla degiskene ulasirken degiskenAdi yerine bir dizi icinde ['degiskenAdi1','degiskenAdi2'] seklinde devam edilecek...
//---------------------------------------------------------------------------------------
// Notifications olayi
        /*
        * manifest icinden permissons da notifications eklendikten sonra
        * var notifOptions = {
        *                   type: 'basic',
        *                   iconUrl: 'icon48.png',
        *                   title: 'Baslik',
        *                   message: 'Mesaj metni'
        *                   }
        * chrome.notifications.create('notificationID',notifOptions) //ile sag alt kosede mesaj cikar
        * */


        /*
        *
        * */








//--------------------------------------------------------------------------------------------------------------------
    });
