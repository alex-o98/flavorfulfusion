import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import swal from '@sweetalert/with-react'
import { useNavigate } from 'react-router-dom';
function EmailSender(){
  const form = useRef();
  const navigate = useNavigate();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_1siqmdu', 'template_3bs0of7', form.current, 'X2X7axQqk2cON0RQN')
      .then((result) => {
        console.log(result);
          if(result.text==="OK" && result.status === 200){
            console.log(result.text);
            swal({
              text: "Email sent successfully",
              buttons: {
                confirm : {text:'Close',className:'bg-primary focused:border-[0px]'},
              },
            }).then(function(){
              navigate('/')
            });
          }
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>
    <div className='flex justify-center '>
      <form className='flex flex-col justify-center w-[300px]'ref={form} onSubmit={sendEmail}>
        <label className='w-full flex justify-start text-lg pt-4'>Name</label>
        <input className='border-2 border-[#d7a051] rounded-md' type="text" name="user_name" />

        <label className='w-full flex justify-start text-lg pt-4'>Email</label>
        <input className='border-2 border-[#d7a051] rounded-md' type="email" name="user_email" />

        <label className='w-full flex justify-start text-lg pt-4'>Phone number</label>
        <input className='border-2 border-[#d7a051] rounded-md' type="text" name="phone_number" />

        <label className='w-full flex justify-start text-lg pt-4'>Message</label>
        <textarea className='border-2 border-[#d7a051] rounded-md min-h-[100px]' name="message" />

        <div className='flex justify-center pt-4'>
          <button className='border border-[#b48a4f] hover:bg-[#f8d7a7] text-black my-auto bg-primary p-2 px-6 rounded-lg text-lg cursor-pointer hover:scale-105 transition duration-300' type="submit" value="Send">Send</button>
        </div>

      </form>
    </div>
    </>
  );
};


export default EmailSender