document.addEventListener("DOMContentLoaded", event => {


    const app = firebase.app();
    console.log(app);

    const db =firebase.firestore();

    const myPost = db.collection('post').doc(SW1yfY5nX5YkppaIwOGS)

    myPost.get()
        .then(doc => {
            const data = doc.data();
            document.write(data.title + '<br>')
            document.write(data.createdAt)
        })

    





});



function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}!`);
            console.log(user)      
        })
        .catch((err) => {
            console.log(err)
        })
}
