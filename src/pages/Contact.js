import React from 'react'
import logo from '../assets/logo-small.png'
import { useNavigate } from 'react-router-dom';
import EmailContent from '../components/EmailContent'
import EmailSender from '../components/EmailSender';
// bg-[#d7a051]
// hover:bg-[#f8d7a7]
// border-[#b48a4f] 
function Contact() {
  const navigate = useNavigate();
  return (
    <div>
        <div className='fixed top-0 left-0 w-full h-[75px] flex flex-row justify-between border-b-2 border-[#b48a4f]'>
            <div className='flex flex-col justify-center pl-10'>
              <img className='left-[25px] top-0 w-[50px] h-[50px] aspect-square object-contain cursor-pointer
                              hover:scale-[1.15] transition duration-300' 
              src={logo} alt='' onClick={() => navigate('/')}/>
            </div>   
            <div className='flex flex-row pr-10'>   
              <div className='px-2 flex flex-col justify-center'>
                <button onClick={() => navigate('/')} className='border-[#b48a4f] border transition duration-300 hover:bg-[#f8d7a7] w-[100px] h-[calc(100%-20px)] rounded-lg'>Homepage</button>
              </div>
              <div className='px-2 flex flex-col justify-center'>
                <button onClick={() => navigate('/menu')} className='border-[#b48a4f] border transition duration-300 hover:bg-[#f8d7a7] w-[100px] h-[calc(100%-20px)] rounded-lg'>Menu</button>
              </div>
            </div> 
        </div>
      <div className='pt-20'>
        <EmailContent/>
        <EmailSender/>
      </div>
</div>
  )
}

export default Contact
