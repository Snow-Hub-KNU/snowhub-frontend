import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../../MangeCookies"

// 실행순서: 빈배열 렌더링 -> useEffect ->list에 변경감지 -> list와 관련된 부분 재랜더링
const BoardList = ()=>{
    const [list,setList] = useState('');
    const [page,setPage] = useState(0); // 첫페이지는 항상 0
    const [total,setTotal] =useState('');

    const pagination = ()=>{
        const prefix = parseInt(page/5)*5;
        console.log("pre: "+prefix);
        const buttonList = [];
        let i=0
        while(i<5){
            if(i+prefix>=total){
                break;
            }

            buttonList.push(<button key={i+prefix} onClick={(e)=>{setPage(e.target.value)}} value={i+prefix}>{i+prefix}</button>);
            i++;
        }

        const gotoNext = (
            prefix+5>total ? <div>No</div> : <button onClick={()=>{setPage(prefix+5)}}>{">"}</button>
        )

        const gotoPre = (
            prefix-5>=0 ? <button onClick={()=>{setPage(prefix-5)}}>{"<"}</button> : <div>No</div>
            
        )
        // 이전 페이지네이션으로 이동
        // 다음 페이지네이션으로 이동()
        const component = (
            <div>
                <div>{gotoPre}</div>
                <div>{buttonList}</div>
                <div>{gotoNext}</div>
            </div>
            
        );


        return component;
        
    }


    const lists = () => {
        const result = [];
        for (let i = 0; i < list.length; i++) {
          result.push(<div key={i}>{list[i].title + " / "}</div>);
        }
        return result;
      };

    // deps에 특정값을 넣게 되면 컴포넌트가 mount 될 때 -> 지정한 값이 업데이트될 때 useEffect를 실행합니다.
    useEffect(()=>{
        axios.get('http://localhost:8000/board/list?page='+page,
        {
                //params: {name: name},
                headers: {Authorization: 'Bearer '+getCookie('IdTokenCookie'),
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Access-Control-Allow-Credentials':"true",
                'Content-Type': 'application/json'
            }
        }
        )
        .then(
            
            // 성공했을떄, 반환이 되는 값
            (Response) => {
            //console.log(Response.data);
            const tmpArray = Response.data;
            const getTotalPage = tmpArray.pop();
            setTotal(getTotalPage.id);  
            setList(tmpArray);       
        }                
        ).catch(
            // 실패, 즉 에러가 발생했을떄 발생.
            (error) => {}
            )
    },[page])

    return (
        <div>
        <h1> Board Write Page!</h1>
            <div>
                {lists()}
                {pagination()}
            </div>
        </div>
    );
}


export default BoardList;