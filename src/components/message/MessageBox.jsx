import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from 'react-redux';
import Heading from '../utilities/Heading';

const MessageBox = () => {

  const userdata = useSelector((state) => state.loginUser.value); // who login ...
  const frndsdata = useSelector((state) => state.chatUser.value);

  return (
    <>
    {
      frndsdata ?
        <section className='msgmain'>
            <div className='msgheadingbox'>
              <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                <div className='imgbox'></div>
                <div>
                    <h3 className='msgusername'>{
                      userdata.uid == frndsdata.senderId ?
                        frndsdata.receiverName
                          :
                        frndsdata.senderName
                    }
                    </h3>
                    <p className='msgsubheading'>active now</p>
                </div>
              </div>
              <HiOutlineDotsVertical style={{color: 'white', fontSize: '30px'}} />
            </div>
            <div className='msgarea'>
              <div className='sendermsg'>
                <p>hi</p>
              </div>
              <div className='receivermsg'>
                <p>hello</p>
              </div>
              <div className='sendermsg'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptatem fugit sint velit deserunt fuga, eius aspernatur minima aperiam vero fugiat, ducimus voluptate, blanditiis sequi incidunt quaerat et excepturi est dolor? Mollitia, hic, necessitatibus ea reiciendis accusamus quo ipsum eaque sit debitis eveniet sunt placeat tenetur corrupti dolore, consequuntur quod.</p>
              </div>
              <div className='receivermsg'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, in! Expedita quo vitae, ipsum veniam perferendis culpa maxime aperiam nobis!</p>
              </div>
              <div className='sendermsg'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptatem fugit sint velit deserunt fuga, eius aspernatur minima aperiam vero fugiat, ducimus voluptate, blanditiis sequi incidunt quaerat et excepturi est dolor? Mollitia, </p>
              </div>
              <div className='receivermsg'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, </p>
              </div>
            </div>
            <div className='bottombox'>
                <input type="text" className='msginput' placeholder='Enter your text' />
                <button className='sendbtn'>send</button>
            </div>
        </section>
          :
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '100vh'}}>
          <Heading 
            Heading={'h2'}
            text= 'please select a user'
            style={{fontSize: '50px'}}
          />
        </div>
    }
    </>
  )
}

export default MessageBox