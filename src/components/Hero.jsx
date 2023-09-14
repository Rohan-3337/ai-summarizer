import React from 'react'
import logo from '../assets/logo.png'
import "../App.css"
import styled from 'styled-components'
const Hero = () => {
  return (
    <Header>
        <nav>
          <img src={logo} alt="brand" className=' w-28 object-contain' />
          <button onClick={()=>{window.open("https://github.com/Rohan-3337","_blank")}} className='py-1.5 px-5'>Github</button>
     
        </nav>
        <h1 className="head-text mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
            Summarize article with <br/>
            <span className=''>OPENAI GPT-4</span>

        </h1>
        <h2 className='desc '>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>

    </Header>
  )
}
const Header = styled.header`
width:100vw;
display:flex;
justify-content:center;
align-items:center;
flex-direction: column;
padding: 1.5rem;
nav{
  width:100%;
  display:flex;
  justify-content: space-between;
  align-items:center;

  margin-bottom: 2.5rem;
  padding-top: .75rem; 
  img{
    width: 7rem;
    object-fit: contain; 
  }
  button{
    padding: 6px 20px;
    background-color: #000;
    color: #fff;
    border-radius: 5rem;
    transition: all 0.3s ease-in-out;
    &:hover{
      background-color: #fff;
      color: #000;
      border: 1px solid #000;

      
    }
  }
  
}
h1{
  margin-top: 1.25rem;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.15;
  span{
    color: linear-gradient(to right, #F37335, #FDC830);
  }
  
}
h2{
  margin-top: 1.25rem;
  font-size: 18px;
}



@media (min-width: 768px){
  h1{
    font-size: 3.75rem;
    line-height: 1;
  }
}
`;

export default Hero