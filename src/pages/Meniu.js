import React,{useEffect, useState, useLayoutEffect} from 'react'
import logo from '../assets/logo-small.png'
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchToken,removeToken, setToken } from '../components/Auth';
import jwt from 'jwt-decode'
import ReactModal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {AiOutlineClose} from 'react-icons/ai'
import axios from "axios";
import Constants from '../components/Constants';

const ApiURL = Constants.API_URL

function Meniu() {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 4,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 484
      },
      items: 4,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: {
        max: 484,
        min: 0
      },
      items: 2,
      partialVisibilityGutter: 30
    },
    
  };
  const navigate = useNavigate();

  

  const [data, setData] = useState([]);
  const [selection, setSelection] = useState("Soup");
  const [toDelete, setToDelete] = useState({id:-1,title:""})
  const [toEdit, setToEdit] = useState({id:-1,tite:"",description:"",price:-1,grams:-1})
  const [newEdit, setNewEdit] = useState({id:-1,tite:"",description:"",price:-1,grams:-1})
  const [addNew, setAddNew] = useState({tite:"",description:"",category:"soup",price:-1,grams:-1,image:""})

  function resetDeletion(){
    setToDelete({id:-1,title:""});
  }
  function resetEdit(){
    setNewEdit({id:-1,tite:"",description:"",price:-1,grams:-1});
  }

  const addData = async() => {
    const formData = new FormData();
    formData.append("title",addNew.title);
    formData.append("description",addNew.description);
    formData.append("price",addNew.price);
    formData.append("grams", addNew.grams);
    formData.append("category",addNew.category);
    formData.append('file', addNew.image, addNew.image.name);
    axios.post(`${ApiURL}/foods`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    window.location.reload(false);

  };

  const editData = async() => {
    if(toEdit.id < 0 || toEdit.title == "")
      return
    try{
      const response = await fetch(`${ApiURL}/foods/?id=${toEdit.id}&title=${toEdit.title}&description=${toEdit.description}&price=${toEdit.price}&grams=${toEdit.grams}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
        },
    });      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      window.location.reload(false);
    }catch{
      
    }
   
  };

  const deleteData = async() => {
    if(toDelete.id < 0 || toDelete.title == "")
      return

    try{
      const response = await fetch(`${ApiURL}/foods/?id=`+toDelete.id, {
        method: 'DELETE',
        headers: {
        Accept: 'application/json',
        },
    });      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      resetDeletion();
      window.location.reload(false);
    }catch{
      
    }
   
  };

  const getData = async() => {
      if(selection === "")
        return
      
      try{
          const response = await fetch(`${ApiURL}/foods/?category=`+selection, {
              method: 'GET',
              headers: {
              Accept: 'application/json',
              },
          });
          
          if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
          
          const result = await response.json();
          const categ = result.categorie

          setData(result.data);

      }
      catch{
          
      }
  };
  useLayoutEffect(()=>{
    document.body.style.backgroundColor = "#fff4f0";
  })

  useEffect(() => {
    if(toDelete.id != -1)
      confirmAlert(options)
  },[toDelete]);
  
  useEffect(() => {
    
    getData()
  }, [selection]);

  const options = {
    message: `Are you sure you want to delete the food  ${toDelete.title}`,
    buttons: [
      {
        label: 'Yes',
        onClick: () => deleteData()
      },
      {
        label: 'No'
      }
    ]
  };

  useEffect(() => {
    if(toEdit.id != -1){
      
      openModal();
    }
  }, [toEdit.id]);
// Modal consts
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalAddIsOpen, setAddIsOpen] = useState(false);
  function openModal() {
      setIsOpen(true);
    }
  function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
  function closeModal() {
    resetEdit();
    setIsOpen(false);
  }

  // Add modal
  function openAddModal() {
    setAddIsOpen(true);
  }
  function closeAddModal() {
    resetEdit();
    setAddIsOpen(false);
  }

  return (
      <div className='h-full'> 
      {/* Top navbar (mobile)*/}
        <div className='relative top-[20px] max-w-[calc(100%-50px)] min-[550px]:max-w-[500px]  mx-auto z-40 select-none 
                        md:hidden'>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={true}
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          itemClass=""
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={true}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          slidesToSlide={2}
          showDots={false}
          sliderClass=""
          swipeable
        >
            <div className='pt-2 flex flex-col justify-center transition duration-150 hover:scale-[1.1] cursor-pointer'
                            onClick={()=>{
                            setSelection("Soup");
              }}>
              <div className='relative bg-[#f3ba6b] text-center w-[70px] h-[70px] flex flex-col justify-center mx-auto rounded-full'>
                <img className='rounded-full' 
                  src='https://flavorful-fusion.s3.eu-central-1.amazonaws.com/foods/assets/menu/navbar-images/soup.jpg' ></img>
              </div>
              <div className='mx-auto text-center'>                 
                <p>Soup</p>
              </div>
            </div>
            <div className='pt-2 flex flex-col justify-center transition duration-150 hover:scale-[1.1] cursor-pointer' onClick={()=>{
                            setSelection("Main course");
              }}>
              <div className='relative bg-[#f3ba6b] text-center w-[70px] h-[70px] flex flex-col justify-center mx-auto rounded-full'>
                <img className='rounded-full' 
                    src='https://flavorful-fusion.s3.eu-central-1.amazonaws.com/foods/assets/menu/navbar-images/main-course.jpg' ></img>
              </div>
              <div className='mx-auto text-center'>                 
                <p>Main course</p>
              </div>
            </div>
            <div className='pt-2 flex flex-col justify-center transition duration-150 hover:scale-[1.1] cursor-pointer' onClick={()=>{
                            setSelection("Appetizer");
              }}>
              <div className='relative bg-[#f3ba6b] text-center w-[70px] h-[70px] flex flex-col justify-center mx-auto rounded-full'>
                <img className='rounded-full' 
                    src='https://flavorful-fusion.s3.eu-central-1.amazonaws.com/foods/assets/menu/navbar-images/appetizer.jpg' ></img>
              </div>
              <div className='mx-auto text-center'>                 
                <p>Appetizer</p>
              </div>
            </div>
            <div className='pt-2 flex flex-col justify-center transition duration-150 hover:scale-[1.1] cursor-pointer' onClick={()=>{
                            setSelection("Appetizer");
              }}>
              <div className='relative bg-[#f3ba6b] text-center w-[70px] h-[70px] flex flex-col justify-center mx-auto rounded-full'>
                <img className='rounded-full' 
                    src='https://flavorful-fusion.s3.eu-central-1.amazonaws.com/foods/assets/menu/navbar-images/appetizer.jpg' ></img>
              </div>
              <div className='mx-auto text-center'>                 
                <p>Appetizer</p>
              </div>
            </div>
            <div className='pt-2 flex flex-col justify-center transition duration-150 hover:scale-[1.1] cursor-pointer' onClick={()=>{
                            setSelection("Appetizer");
              }}>
              <div className='relative bg-[#f3ba6b] text-center w-[70px] h-[70px] flex flex-col justify-center mx-auto rounded-full'>
                <img className='rounded-full' 
                    src='https://flavorful-fusion.s3.eu-central-1.amazonaws.com/foods/assets/menu/navbar-images/appetizer.jpg' ></img>
              </div>
              <div className='mx-auto text-center'>                 
                <p>Appetizer</p>
              </div>
            </div>
            <div className='pt-2 flex flex-col justify-center transition duration-150 hover:scale-[1.1] cursor-pointer'
                            onClick={()=>{
                            setSelection("Soup");
              }}>
              
            </div>
          </Carousel>
        </div>      
      {/* left navbar (if w>100) */}
      <div className='bg-[#d7a051] hidden fixed top-0 left-0 w-[200px] h-[100%] overflow-scroll scrollbar-hide
                      md:block'>
      
        {/* Links */}
        <ul className='relative top-0 flex flex-col justify-start bg-[#f3ba6b] z-10 overflow-scroll border-b-2
                      h-[100vh] rounded-none border-[#b48a4f] overflow-y-auto overflow-x-auto'>
          {/* Logo */}
          <li className='my-0 mx-auto '>
            <div className=''>
              <img className='block w-[100px] h-[100px] aspect-square object-contain cursor-pointer px-2
                              hover:scale-[1.15] transition duration-300' 
              src={logo} alt='' onClick={() => navigate('/')}/>
            </div>       
          </li>
          <li className={`flex flex-col justify-center py-4 text-center border-[#b48a4f] 
                           hover:cursor-pointer
                        ${selection === "Soup" ? "bg-[#f8d7a7]" : "transition duration-150 hover:bg-[#f8d7a7] md:border"}`}
              onClick={()=>{
                setSelection("Soup")
              }}>
              <p className=''>Soup</p>
          </li>          
          <li className={`flex flex-col justify-center py-4 text-center border-[#b48a4f] 
                           hover:cursor-pointer
                        ${selection === "Main course" ? "bg-[#f8d7a7]" : "transition duration-150 hover:bg-[#f8d7a7] md:border"}`}
              onClick={()=>{
                setSelection("Main course")
              }}>
              <p className=''>Main course</p>
          </li>
          <li className={`flex flex-col justify-center py-4 text-center border-[#b48a4f] 
                           hover:cursor-pointer
                        ${selection === "Appetizer" ? "bg-[#f8d7a7]" : "transition duration-150 hover:bg-[#f8d7a7] md:border"}`}
              onClick={()=>{
                setSelection("Appetizer")
              }}>
              <p className=''>Appetizer</p>
          </li>
 
        </ul>

      </div>
    {/* Meniu */}
    <div className="fixed top-[-50px] right-0 left-0 bg-[#FFECCC] bg-cover min-w-[calc(100%-400px)] min-h-[calc(100%+50px)]  bg-no-repeat overflow-scroll
                  md:left-[200px] scrollbar-hide">
      <div className="absolute right-0 top-11 left-0 mx-auto ">
        {/* Title */}
        <div className='text-center pt-[200px] 
                        md:pt-[100px]'>
          <h2 className='text-5xl font-bold'>{selection}s</h2>
          {fetchToken() ? (
              
              <div className='pt-2'>
                <button onClick={()=>{openAddModal()}} className='bg-[#00ff00] px-4 rounded-3xl  text-white text-xl shadow-lg shadow-white/20
                        transform transition duration-500 hover:scale-110'>
                        Add new {selection}
                </button>
              </div>
              ) : ''}
        </div>
        {/* Entries (cards of items) */}
        <ul className='pt-10
                      md:pt-20'>
        {data.map(food => {
          return(
            <li id={food.id} className='py-4'>
            <div className='max-w-[500px] flex flex-col justify-center mx-auto
                            md:flex-row'>
              {/* top side image (When small) */}
              <div className='block relative mx-auto
                              md:hidden'>
                <img className='max-w-[150px] max-h-[150px] min-w-[100px] min-h-[100px] aspect-square	overflow:hidden rounded-full' src={food.image} alt='' ></img>
              </div>
            {/* Left side */}
              <div className='pr-4  flex flex-col max-w-[300px] w-[300px] mx-auto
                              md:mx-0'>
                <h3 className='text-xl font-bold'>
                  {food.title}
                </h3>
                <hr className='border-[#b48a4f]'/>
                <p className='text-sm'>
                  {food.description}
                </p>
                <div className='flex justify-between'>
                  <div className='font-semibold'>
                    {food.price} RON
                  </div>
                  <div className='font-semibold italic'>
                    {food.grams}g
                  </div>
                </div>

              </div>
              {/* Right side (Image) */}
              <div className='hidden md:block my-auto mx-auto'>
                <img className='max-w-[150px] max-h-[150px] min-w-[100px] min-h-[100px] aspect-square	overflow:hidden rounded-full' src={food.image} alt=''></img>
              </div>          
            </div>
            {/* Buttons (If token is set and auth_level is 1) */}
            {fetchToken() ? (
            <div className='max-w-[500px] flex justify-between mx-auto pt-3'>
              
              <div>
                <button onClick={() => 
                {setToDelete({id:food.id,title:food.title})}} className='bg-[#d11c1c] w-[75px] rounded-3xl  text-white text-xl shadow-lg shadow-white/20
                        transform transition duration-500 hover:scale-110'>
                        Delete
                </button>
                
              </div>
              <div>
                <button onClick={() => setToEdit({
                  id:food.id, title:food.title, 
                  description: food.description, price: food.price,
                  grams:food.grams
                })} className=' bg-[#1cd11f] w-[75px] rounded-3xl  text-white text-xl shadow-lg shadow-white/20
                    transform transition duration-500 hover:scale-110'>
                        Edit
                </button>
              </div>
            </div>) : ''}
          </li>
          
          )
        })}
        </ul>
        

      </div>
    </div>

        {/* Edit modal */}
        <ReactModal 
            isOpen={true}
            closeTimeoutMS={200}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            overlayClassName={`item transition transform ease-in-out duration-1000" ${modalIsOpen ? 'item-open':'item-close'}`}
            className="mx-auto p-6 bg-[#f9f3f0] max-w-[300px] rounded-3xl"
            contentLabel="Example Modal"
        >   

            <div className='flex justify-end'>
                <AiOutlineClose className="cursor-pointer" size={20} onClick={closeModal}></AiOutlineClose>
            </div>
            
            <div className='flex flex-col'>
              {/* Title */}
              <div className='flex justify-center py-1'>
              <h1 className='text-2xl font-bold'>Editing food</h1>                                
              </div>
              {/* Food title */}
              <div className='flex flex-col py-3'>
                <div className='flex justify-center'>Title</div>
                
                <div className='flex justify-center'>
                  <textarea className='w-[260px] min-h-[27px] h-[27px] resize-y' 
                    value={toEdit.title}
                    onChange={(e) => setToEdit({'id':toEdit.id,
                                                'title':e.target.value,
                                                'description':toEdit.description,
                                                'price':toEdit.price,
                                                'grams':toEdit.grams})}></textarea></div>
              </div>
              {/* Description */}
              <div className='flex flex-col py-3'>
                <div className='flex justify-center'>Description</div>
                <div className='flex justify-center'><textarea className='w-[286px] h-auto resize-y'
                value={toEdit.description}
                onChange={(e) => setToEdit({'id':toEdit.id,
                                            'title':toEdit.title,
                                                'description':e.target.value,
                                                'price':toEdit.price,
                                                'grams':toEdit.grams})}></textarea></div>
              </div>
              {/* Price and grams */}
              <div className='flex justify-between'>
                {/* Left */}
                <div className='flex flex-col justify-center'>
                  <div className='flex justify-center'>
                    Price
                  </div>
                  <div >
                    <input className='max-w-[60px] text-center' 
                    value={toEdit.price}
                    onChange={(e) => setToEdit({'id':toEdit.id,
                                                  'title':toEdit.title,
                                                    'description':toEdit.description,
                                                    'price':e.target.value,
                                                    'grams':toEdit.grams})}></input>
                  </div>
                </div>
                {/* Right */}
                <div className='flex flex-col justify-center'>
                  <div className='flex justify-center'>
                    Grams
                  </div>
                  <div >
                    <input className='max-w-[60px] text-center' 
                    value={toEdit.grams}
                    onChange={(e) => setToEdit({'id':toEdit.id,
                                              'title':toEdit.title,
                                                    'description':toEdit.description,
                                                    'price':toEdit.price,
                                                    'grams':e.target.value})}></input>
                  </div>
                </div>
              </div>
              {/* Save button */}
              <div className='flex justify-center py-4'>
                    <button onClick={()=>{editData()}}className='bottom-2 mx-auto border 
                    bg-gradient-to-b from-[#f8be6d] to-[#d7a051]
                    text-white px-14 py-1 rounded-full text-[20px] shadow-md shadow-white/20
                    transform transition duration-200 hover:scale-105'>
                        Save
                    </button>  
                </div>
            </div>
        
            
        </ReactModal>

        {/* Add item */}
        {/* Edit modal */}
        <ReactModal 
            isOpen={true}
            closeTimeoutMS={200}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeAddModal}
            overlayClassName={`item transition transform ease-in-out duration-1000" ${modalAddIsOpen ? 'item-open-add':'item-close'}`}
            className="mx-auto p-6 bg-[#f9f3f0] max-w-[300px] rounded-3xl"
            contentLabel="Example Modal"
        >   

            <div className='flex justify-end'>
                <AiOutlineClose className="cursor-pointer" size={20} onClick={closeAddModal}></AiOutlineClose>
            </div>
            <div className='flex flex-col'>
              {/* Title */}
              <div className='flex justify-center py-1'>
              <h1 className='text-2xl font-bold'>Editing food</h1>                                
              </div>
              {/* Food title */}
              <div className='flex flex-col py-3'>
                <div className='flex justify-center'>Title</div>
                
                <div className='flex justify-center'>
                  <textarea className='w-[260px] min-h-[27px] h-[27px] resize-y' 
                    onChange={(e) => setAddNew({'title':e.target.value,
                                                'description':addNew.description,
                                                'category':addNew.category,
                                                'price':addNew.price,
                                                'grams':addNew.grams,
                                                'image':addNew.image})}></textarea></div>
              </div>
              {/* Description */}
              <div className='flex flex-col py-3'>
                <div className='flex justify-center'>Description</div>
                <div className='flex justify-center'><textarea className='w-[286px] h-auto resize-y'
                onChange={(e) => setAddNew({'title':addNew.title,
                                            'description':e.target.value,
                                            'category':addNew.category,
                                            'price':addNew.price,
                                            'grams':addNew.grams,
                                            'image':addNew.image})}></textarea></div>
              </div>
              {/* Category */}
              <div className='flex flex-col py-3'>
                <div className='flex justify-center'>Category</div>
                <div className='flex justify-center'>
                <select name="category"
                  value={addNew.category}
                  onChange={(e) => setAddNew({'title':addNew.title,
                                            'description':addNew.description,
                                            'category':e.target.value,
                                            'price':addNew.price,
                                            'grams':addNew.grams,
                                            'image':addNew.image})}>
                  <option value="soup">Soup</option>
                  <option value="main-course">Main Course</option>
                  <option value="appetizer">Appetizer</option>
                </select>
                </div>

              </div>
              {/* Price and grams */}
              <div className='flex justify-between'>
                {/* Left */}
                <div className='flex flex-col justify-center'>
                  <div className='flex justify-center'>
                    Price
                  </div>
                  <div >
                    <input className='max-w-[60px] text-center' 
                    onChange={(e) => setAddNew({'title':addNew.title,
                                                'description':addNew.description,
                                                'category':addNew.category,
                                                'price':e.target.value,
                                                'grams':addNew.grams,
                                                'image':addNew.image})}></input>
                  </div>
                </div>
                {/* Right */}
                <div className='flex flex-col justify-center'>
                  <div className='flex justify-center'>
                    Grams
                  </div>
                  <div >
                    <input className='max-w-[60px] text-center' 
                    onChange={(e) => setAddNew({'title':addNew.title,
                                              'description':addNew.description,
                                              'category':addNew.category,
                                              'price':addNew.price,
                                              'grams':e.target.value,
                                              'image':addNew.image
                                              })}></input>
                  </div>
                </div>
                
              </div>
              {/* Upload img */}
              <div className='flex py-3'>
                <input
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    setAddNew({'title':addNew.title,
                              'description':addNew.description,
                              'category':addNew.category,
                              'price':addNew.price,
                              'grams':addNew.grams,
                              'image':e.target.files[0]});
                  }}
                />
                </div>
              {/* Save button */}
              {/* {console.log(addNew.title,addNew.description,addNew.price,addNew.grams)} */}
              <div className='flex justify-center py-4'>
                    <button onClick={()=>addData()}className='bottom-2 mx-auto border 
                    bg-gradient-to-b from-[#f8be6d] to-[#d7a051]
                    text-white px-14 py-1 rounded-full text-[20px] shadow-md shadow-white/20
                    transform transition duration-200 hover:scale-105'>
                        Save
                    </button>  
                </div>
            </div>
        </ReactModal>
    </div>
  )
}

export default Meniu