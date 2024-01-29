import { useState } from 'react'
import "../App.css"
import { Link } from 'react-router-dom'
function Form() {

    
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phoneNumber: '',
    password: '',
    RepeatYourPassword:'',
  })


  const [alerts, setAlerts] = useState({
    firstName: '',
    email: '',
    phoneNumber: '',
    password: '',
    RepeatYourPassword:'',
  })
  const [FocusState, setFocusState] = useState({
    firstName: false,
    email: false,
    phoneNumber: false,
    password:false,
    RepeatYourPassword: false,
  })

  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const handleChange = (e) =>{
    const{name,value}= e.target;
    setFormData((prevData) => ({...prevData,[name]:value}) )
  };
  const handleFocus = (name)=>{
    setFocusState((prevfocusState)=>({...prevfocusState,[name]: true}))

  }

// for password validation
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  const handleSubmit = (e)=>{
    e.preventDefault();

    const newAlerts = {};

    if(formData.firstName === '' ){
      newAlerts.firstName = 'please enter your name.';

    }
    else if(formData.firstName.length<3 ){
        newAlerts.firstName = 'name should be more than 3 characters';
    }
    else if(formData.firstName.length>30){
        newAlerts.firstName = 'name should be less than 30 characters'
    }
    else{
      newAlerts.firstName ='';
    }

    

    if(formData.phoneNumber === ''){
      newAlerts.phoneNumber = 'please enter your phone number.';

    }
    else{
      newAlerts.phoneNumber ='';
    }

    if(formData.email === ''){
      newAlerts.email = 'please enter your email.';

    }
    else{
      newAlerts.email ='';
    }

    if(formData.password === ''){
        newAlerts.password = 'please enter your password.';
  
      }
    else if( specialCharRegex.test(formData.password)=== false || formData.password.length<10 ){
        newAlerts.password = 'please enter valid password';
    }
      else{
        newAlerts.password ='';
      }

      if(formData.RepeatYourPassword=== ''){
        newAlerts.RepeatYourPassword = 'please repeat your password.';
  
      }

      if(formData.RepeatYourPassword !== formData.password){
        newAlerts.RepeatYourPassword = 'passwords dont match';
  
      }
      else{
        newAlerts.RepeatYourPassword = ''
      }

    setAlerts(newAlerts)

    if(
      newAlerts.firstName === ''  && newAlerts.phoneNumber ==='' && newAlerts.email==='' && newAlerts.password==='' && newAlerts.RepeatYourPassword ===''
    ){
      localStorage.setItem('formData', JSON.stringify(formData));
      sessionStorage.setItem('formData',JSON.stringify(formData))
      setRegistrationSuccess(true)
      
    }
    
  }
  return (
    <>
    <h1 className='formTitle'>Sign-up</h1>
      <div className="form">
        {registrationSuccess && (
          <div style={{backgroundColor: 'blue', color:'white',padding:'10px',marginTop:'10px',borderRadius:'8px',textAlign:'center'}}>
            Registration Successfull !
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            <input type='text' name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your name" onFocus={() => handleFocus('firstName')} style={{ borderColor: FocusState.firstName ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.firstName}</div>
          </label>
          <br />
                    
          {/* For email */}
          <label>
            <input type='email' name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" onFocus={() => handleFocus('email')} style={{ borderColor: FocusState.email ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.email}</div>
          </label>
          <br />
          {/* For phone number */}
          <label>
            <input type='tel' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phoneNumber" onFocus={() => handleFocus('phoneNumber')} style={{ borderColor: FocusState.phoneNumber ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.phoneNumber}</div>
          </label>
          <br />
          {/* Password */}
          <label >
          <input type='password' name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" onFocus={() => handleFocus('password')} style={{ borderColor: FocusState.password ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.password}</div>
          </label>
          <br />
          {/* Repeat password */}
          <label >
          <input type='password' name="RepeatYourPassword" value={formData.RepeatYourPassword} onChange={handleChange} placeholder="Rpeat your Password" onFocus={() => handleFocus('RepeatYourPassword')} style={{ borderColor: FocusState.RepeatYourPassword ? 'navy' : '#ccc' }} />
            <div className="alert">{alerts.RepeatYourPassword}</div>
          </label>
          <br />
          {/* submit button  */}
          
     
        <button id='submit' type='submit' style={{   padding: '10px', border: 'none', cursor: 'pointer' }}>Sign up</button>
       
        
          
        
          
        </form>
      </div>
    </>
  )

}

export default Form