import React, { useEffect, useState } from 'react'
import images1 from '../images/images1.jpg'
import images2 from '../images/images2.jpg'
import images3 from '../images/images3.jpg'
import backimage from '../images/backimage.png'
import './Home.css';

const collections = [
  {

    imgUrl: images1,
    title: "FronX",
  },
  {

    imgUrl: images2,
    title: "Nexon",
  },
  {

    imgUrl: images3,
    title: "i10 NIOS",
  }
]

export default function Home() {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setUserName(data.name);
        setShow(true);
      } else if (res.status === 401) {
        // Handle unauthorized access here, e.g., redirect to login page
        console.log('Unauthorized Access');
      } else {
        console.log('Unexpected error:', res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
    <div>
      <div className="main-heading" >
        <p>Welcome </p>
        <h2> To Car Dekhiye</h2>
      </div>
      <div className='mapflex'>
        {collections.map((collection, i) => {
          return (

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img style={{ width: "20rem", height: "15rem" }} src={collection.imgUrl} alt='images1' ></img>
              <h1>{collection.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
