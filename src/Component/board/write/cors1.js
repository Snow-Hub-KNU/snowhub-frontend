import "./styles.css";
import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../MangeCookies";

const Cors = ()=>{
    const [title,setTitle] =  useState('');// 변경감지를 위한 변수 선언
    const [content,setContent] =  useState('');// 변경감지를 위한 변수 선언
    const navigate = useNavigate();

    const onSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',title);
        formData.append('content',content);

        axios.get('http://localhost:8000/board/test',
        {
            //params: {name: name},
            headers: {
            "Access-Control-Allow-Origin": 'http://localhost:3000',
            
        }
        
        })
        .then(
            // 성공했을떄, 반환이 되는 값
            (Response) => {
            console.log("success");
            alert(Response);
            
        }                
        )
        .catch(
            // 실패, 즉 에러가 발생했을떄 발생.
            (error) => {
                alert(error);
            }
        );
    }

    

    return(
        <div>

            <div id="header">
                <div id="x-bold"></div>
                <h2>내 게시글 올리기</h2>
            </div>

            <h2>내 게시글 올리기</h2>
                
            <div>
                <h3>사진 넣는 곳</h3>
            </div>

            <h3>카테고리</h3>
            <div>
                [시즌방] [스몰토크] [정보 공유] [사용후기]
            </div>

            <form onSubmit={(e)=>onSubmit(e)}>

                <label>
                    <h3>글 제목</h3>
                    <input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} />
                </label>

                <label>
                    
                    <h3>글 본문</h3>
                    <textarea name="content" onChange={(e)=>setContent(e.target.value)} />
                </label>

                <input type="submit" value="Submit" />
            </form> 
        </div>      
    );

}

export default Cors;