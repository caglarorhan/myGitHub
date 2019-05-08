
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

let gitt = new gitProcs('caglarorhan');
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

//------------------------------------------------------------------------------------------
// chrome.storage.sync.get('degiskenAdi',function(storageTemsiliDegiskenAdi){
    // storageTemsiliDegiskenAdi.degiskenAdi //ile ulasiliyor kayirli veriye
// }); //callback sart -storage boyle kullaniliyor
// veri set ederken de, key value olan bir objeyi set edecegiz
// chrome.storage.sync.set({'degiskenAdi': yeniDeger})

//---------------------------------------------------------------------------------------
