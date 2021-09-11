 import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CallbackPage(props) {

    let myArr1;
    let myArr2;
    let img = [];

    const [code, setCode] = useState();
    const [albums, setAlbums] = useState([]);

    useEffect(async () => {
        myArr1 = props.location.search.split("?code=");

        myArr2 = myArr1[1].split("&state=");

        // console.log(myArr2[0]);
        setCode(myArr2[0]);

        const res1 = await axios.get(`https://graph.facebook.com/v11.0/oauth/access_token?client_id=579207406764914&redirect_uri=http://localhost:3000/facebookapp/callback&client_secret=7713750fdf1076a02df161d4ec8444d9&code=${myArr2[0]}`);

        // console.log(res1.data.access_token);
        setCode(res1.data.access_token);

        let url = 'https://graph.facebook.com/me?fields=albums{photos{images,id}}&access_token=' + res1.data.access_token;

        const response = await axios.get(url);

        // console.log(response);

        let arr = response.data.albums.data
        /* reading inner arrays using foreach loop */
        arr.forEach(element => {
            if (element.photos.data.length !== 1) {
                let innerArray = element.photos.data
                innerArray.forEach(inElement => {
                    let temp = {
                        id: inElement.id,
                        image: inElement.images[0].source
                    };
                    img.push(temp); /* push images to album array */
                });
            }
            setAlbums(img)
        });

        console.log(img);

    }, [])


    return (
        <div>            
            Images Will Be Here...
        </div>
    )
}

export default CallbackPage
