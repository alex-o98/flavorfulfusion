import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import logo_big from '../assets/logo-full-new.png'
import ReactModal from 'react-modal';
import {AiOutlineClose, AiOutlineUser} from 'react-icons/ai'
import {FaUserAlt} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import {fetchToken, setToken, removeToken} from '../components/Auth'
import axios from "axios";
import Constants from '../components/Constants';
ReactModal.setAppElement('#root');
const ApiURL = Constants.API_URL

function Home() {
    
    const navigate = useNavigate();
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
      }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [message, setMessage] = useState("");
      const logout = () =>{
          removeToken()
          navigate('/')
      }
      const login = () => {
          if ((username === "") & (password === "")){
              return;
          
          }else{
              console.log({username});
              console.log({password});
              axios.post(`${ApiURL}/login`,{
                  username:username,
                  password:password,
                  
              }).then(function (response){
                  console.log(response.data.token, "response.data.token")
  
                  setMessage(response.data.message)
                  if(response.data.token){
                      setToken(response.data.token);
                      navigate('/meniu')

                  }
              }).catch(function(error){
                  console.log(error,"Error")
              });
          }
      };

  return (
    <>
    <div className='h-[100vh] '>
        
        <div className="bg-[url('assets/homepage-bg.jpeg')] min-[820px]:bg-[url('assets/homepage-bg.jpeg')] bg-cover bg-center min-w-[100%] min-h-[100%] bg-no-repeat flex flex-col justify-center">
            {/* logo */}
            <div className='flex justify-center'>
              <img
              src={logo_big} alt=''/>
            </div> 
            <div className='relative py-6 bottom-0 mx-auto left-0 right-0 md:py-12'>
                <div className='flex flex-col justify-center sm:flex-row'>
                    <div className='py-4 px-10 '>
                        <button onClick={() => navigate('/meniu')} className='border border-[#000] 
                        bg-gradient-to-b from-[#f8be6d] to-[#d7a051] 
                        text-white w-[200px] h-14 rounded-full text-[20px] shadow-md shadow-white/20
                        transform transition duration-500 hover:scale-110'>
                            Menu
                        </button>
                    </div>
                    <div className='py-4 px-10'>
                        <button onClick={() => navigate('/contact')} className='border border-[#000] 
                        bg-gradient-to-b from-[#f8be6d] to-[#d7a051]
                        text-white w-[200px] h-14 rounded-full text-[20px] shadow-md shadow-white/20
                        transform transition duration-500 hover:scale-110'>
                            Contact
                        </button>                        
                    </div>
                </div>
            </div>            
        </div>
        <div>
            <div className='flex justify-center'>
              
                <a onClick={openModal} className={`fixed bottom-2 right-0 mx-auto  
                text-white text-[12px] shadow-white/20 border-b-2 border-[#d7a051] hover:cursor-pointer
                ${fetchToken()? 'hidden' : ''}`}>
                    Login
                </a>
                <a onClick={logout} className={`fixed bottom-2 right-0 mx-auto  
                text-white text-[12px] shadow-white/20 border-b-2 border-[#d7a051] hover:cursor-pointer
                ${fetchToken()? '' : 'hidden'}`}>
                    Logout
                </a>  
                {/* const customStyles = {
                    content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    },
                    };               */}
                <div className={`fixed top-0 left-0 bg-white/40 h-[100vh] w-full ${modalIsOpen ? 'visible' : 'hidden'}`}>
                    <ReactModal 
                        isOpen={true}
                        closeTimeoutMS={200}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        overlayClassName={`item transition transform ease-in-out duration-1000" ${modalIsOpen ? 'item-open':'item-close'}`}
                        className="mx-auto p-6 bg-[#f9f3f0] rounded-3xl"
                        contentLabel="Example Modal"
                    >   
                        <div className='flex justify-end'>
                            <AiOutlineClose className="cursor-pointer" size={20} onClick={closeModal}></AiOutlineClose>
                        </div>
                        {/* content */}
                        <div className='flex flex-col'>
                            {/* Title */}
                            <div className='flex justify-center'>
                                <h1 className='text-2xl font-bold'>Admin Login</h1>                                
                            </div>
                            {/* Username */}
                            <div className='flex flex-col justify-start py-4 mx-auto '>
                                <div className='flex justify-start border-black max-w-[250px]'>
                                    {/* icon */}
                                    <div className='px-1'>
                                        <FaUserAlt size={26} color="#a87c40" />
                                    </div>
                                    {/* input box */}
                                    <div className='px-1'>
                                        <input className='border-b-2 border-[#a87c40] focus:outline-none bg-[#f9f3f0] focus:border-b-[3px] focus:mb-[-3px]' placeholder="Username"
                                        onChange={(e) => setUsername(e.target.value)}></input>
                                    </div>                                
                                </div>
                            </div>
                            <div className='flex flex-col justify-start py-4 mx-auto '>
                                <div className='flex justify-start border-black max-w-[250px]'>
                                    {/* icon */}
                                    <div className='px-1'>
                                        <RiLockPasswordFill className='min-w-[26px] min-h-[26px]' color="#a87c40" />
                                    </div>
                                    {/* input box */}
                                    <div className='px-1'>
                                        <input type="password" className='border-b-2 border-[#a87c40] bg-[#f9f3f0] focus:outline-none focus:border-b-[3px] focus:mb-[-3px]' placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>                                
                                </div>
                            </div>
                            <div className='flex justify-center py-4'>
                                <button onClick={login} className='bottom-2 mx-auto border 
                                bg-gradient-to-b from-[#f8be6d] to-[#d7a051]
                                text-white px-14 py-1 rounded-full text-[20px] shadow-md shadow-white/20
                                transform transition duration-200 hover:scale-105'>
                                    Login
                                </button>  
                            </div>
                        </div>
                        
                    </ReactModal>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home