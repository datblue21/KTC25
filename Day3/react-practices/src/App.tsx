import React from 'react';
import './App.css';

import Button from './components/Button';
import Button2 from './components/Button2';
import Input from './components/Input';
import PhoneIcon from './images/Phone_Icon.png' 
import MUIcon from './images/MU_Icon.png' 
import Male from './images/Male_Img.png'

import { ArrowRight } from 'lucide-react';
import { FaApple, FaGoogle, FaFacebook } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { BiLogoVisa } from "react-icons/bi";
import { GrHide } from "react-icons/gr";

function App() {
  return (
    <React.Fragment>
      <div className="app-wrapper" >
        <div className="section-container">
          <Button type='primary' label='Get Started' rightIcon = {<ArrowRight className="w-4 h-4" />} />
          <Button type='primary' label='Continute with Apple' leftIcon = {<FaApple className="w-5 h-5" />}/>
          <Button type='outline' label='Continute with Google' leftIcon = {<FaGoogle className="w-5 h-5" />}/>
          <Button type='outline'label='Continute with Facebook' leftIcon = {<FaFacebook className="w-5 h-5" />}/>
        </div>
        <div className="section-container">
          <Input placeholder="Search" leftIcon={<CiSearch className="w-5 h-5" />} />
          <Input text="Textfield" leftIcon={<CiSearch className="w-5 h-5" />} />
          <Input placeholder="Search in the web" leftIcon={<CiSearch className="w-5 h-5" />} rightIcon={<ArrowRight className="w-4 h-4" />} />
          <Input placeholder="Search crypto" leftIcon={<CiSearch className="w-5 h-5" />} rightIcon={<FaGoogle className="w-4 h-4" />} />
          <Input placeholder="Phone number" rightIcon={<img src={PhoneIcon} alt="icon" style={{width: "16px", height: "16px"}} />} />
          <Input placeholder="Search in the web" leftIcon={<CiSearch className="w-5 h-5" />} rightIcon={<FaApple className="w-4 h-4 text-yellow-500" />} />
        </div>
       <div className="section-container">
          <Button type='outline' label='Manchester United' leftIcon = {<img src={MUIcon} alt="icon" style={{width: "35px", height: "35px"}} />} rightIcon={<BsThreeDots className="w-4 h-4"/>}/>
          <Button2 leftIcon={<img src={Male} alt="icon" style={{width: "50px", height: "50px", border: "2px"}} />} fullName='Wade Warren' smallIcon={<BiLogoVisa className="w-4 h-4 "/>} position='4293 3242 ••••' rightIcon={<GrHide className="w-4 h-4"/>}/>
          
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;