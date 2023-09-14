import React, { useEffect, useState } from 'react'
import copy from "../assets/copy.png"
import loader from "../assets/loader.png"
import tick from "../assets/tick.png"
import link from "../assets/link.png"
import styled from 'styled-components'
import { useLazyGetSummaryQuery } from '../Services/Article'
const Demo = () => {
  const [article,setArticle] = useState({
    url:"",
    summary:""
  })
  const  [getSummary,{error,isFetching}] = useLazyGetSummaryQuery();

  const [allArticle,setAllArticle] = useState([]);
  const [copied,setCopied] = useState("");
  
  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem('article'));
    if (articleFromLocalStorage){
      setAllArticle(articleFromLocalStorage);
    }
    console.log(articleFromLocalStorage)
  
    
  }, [])
  
  const handlecopy = (copyurl) => {
    setCopied(copyurl);
    navigator.clipboard.writeText(copyurl);
    setTimeout(() => {setCopied(false)},2000);
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const { data}  = await getSummary({articleUrl: article.url});
    if(data?.summary){
      const newArticle = { ...article, summary: data.summary};
      const updateAllarticles = [ newArticle,...allArticle] 
      setArticle(newArticle);
      setAllArticle(updateAllarticles);
      console.log(newArticle);
      console.log(updateAllarticles);
      localStorage.setItem("article", JSON.stringify(updateAllarticles));
      
    }
  }
  return (
    <Section>
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form className=' relative flex justify-center items-center' onSubmit={handleSubmit}>
        <img src={link} alt="link_Icon" className=' absolute left-0 w-5 my-2 ml-3' />
        <input type="url" placeholder='Enter a url' value={article.url}
        onChange={(e)=>{setArticle({...article,url:e.target.value})}} required />
        <button
            type='submit'
            
          >
            <p>↵</p>
          </button>
        </form>
        {/* browse url history */}
        <div className="url-history">
          {allArticle?.map((item,index)=>(
            <div key={`link-${index}`} className='link-card' onClick={()=> setArticle(item)}>
              <div className="copy-btn" onClick={() => handlecopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy" />
                
              </div>
              <p>
                  {item.url}
                </p>
            </div>
          ))}
      </div>


      {/* display Result */}
      <div className="display-result">
      {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <Boxsummary className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
                <hr />
              </h2>
              <div className='summary-box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </Boxsummary>
          )
        )}
      </div>
      </div>
      
    </Section>
  )
}

const Section = styled.section`

width:100%;
display: flex;
align-items: center;
padding: 3rem 12rem;
overflow-y: auto;
flex-wrap: wrap;

div{
  display: flex;
  flex-direction: column;
  gap: 2;
  width: 100%;
  form{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      position: absolute;
      left: 0;
      width: 1.25rem;
      margin: 0.5rem 0;
      margin-left: 0.75rem;
    }
    input{
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: 6px;
      border: 1px solid rgb(229 231 235 / var(--tw-border-opacity));
      background-color: #fff;
      padding: 10px 0;
      padding-left: 2.5rem;
      padding-right: 3rem;
      font-size: 0.875rem/* 14px */;
      line-height: 1.25rem/* 20px */; 
      --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
      font-weight: 500;

      &:focus{
        outline: 2px solid transparent;
        outline-offset: 2px;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        --tw-border-opacity: 1;
        border-color: rgb(0 0 0 / var(--tw-border-opacity));
      }
    }
    button{
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin: 6px 0;
      margin-right: 6px;
      display: flex;
      width: 2.5rem;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem/* 4px */;
      border: 1px solid gray;
      font-size: 0.875rem/* 14px */;
      line-height: 1.25rem/* 20px */;
      &:focus{
        --tw-border-opacity: 1;
        border-color: rgb(55 65 81 / var(--tw-border-opacity));
        --tw-text-opacity: 1;
        color: rgb(55 65 81 / var(--tw-text-opacity));
        --tw-text-opacity: 1;
        color: rgb(55 65 81 / var(--tw-text-opacity));
      }
      
    }

  }
}
.url-history{
  display: flex;
  flex-flow: column;
  gap: 1;
  max-height: 15rem;
  overflow-y: auto;
  p{
    flex: 1 1 0%;
    color: rgb(29 78 216);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
  .link-card{
    padding: 0.5rem;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: row;
    background-color: white;
    border: 1px solid gray;
    gap: 3;
    cursor: pointer;
    .copy-btn{
      width:1.75rem;
      height:1.75rem;
      border-radius: 5rem;
      background-color: rgb(255 255 255 / 0.1);
      --tw-shadow: inset 10px -50px 94px 0 rgb(199,199,199,0.2);
      --tw-shadow-colored: inset 10px -50px 94px 0 var(--tw-shadow-color);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
      --tw-backdrop-blur: blur(8px);
      backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img{
        width: 5;
        height: 40%;
        object-fit: contain;

      }
  
    }
  }
}
.display-result{
  margin: 2.5rem 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

@media (max-width: 768px){
  padding: 1rem;
}
`;
const Boxsummary = styled.div`
display: flex;
flex-direction: column;
width: 35rem;
gap: 3;
background-color: #fff;

padding: .75rem;
.summary-box{
  padding: .75rem;
  line-height: 2;
  line-width: 1rem;
}
h2{
font-size: 3rem;
text-align: left;
margin: .5rem;
font-weight: bold;
span{
  color: #0ED2F7;
}
}
`;
export default Demo