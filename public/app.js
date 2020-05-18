document.addEventListener("DOMContentLoaded", event => {


    const app = firebase.app();
    console.log(app);

    const db =firebase.firestore();

    const myPost = db.collection('post').doc('SW1yfY5nX5YkppaIwOGS');

    myPost.onSnapshot(doc => {

        const data = doc.data();
        document.write(data.title + '<br>')
        document.write(data.createdAt + '<br>')
        document.querySelector('#title').innerHTML = data.title
    })
    

    const productsRef = db.collection('products');

    const query  = productsRef.where('price', '>=', 5).orderBy('price', 'desc').limit(4)

    query.onSnapshot(products => {

    products.forEach(doc => {
        const data = doc.data();
        document.write(`${data.name} at $${data.price}`)
    })

});


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


function updatePost(event) {
    const db= firebase.firestore();
    const myPost = db.collection('post').doc('SW1yfY5nX5YkppaIwOGS');
    myPost.update({ title: event.target.value })
}

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child('horse.jpg');

    const file = files.item(0);

    const task = imgRef.put(file)

    // successful upload
    task.then(snapshot => {
        const url = snapshot.downloadURL
    })

    // monitor progress
    task.on('state_changed', snapshot => {
        console.log(snapshot)

    })
}
