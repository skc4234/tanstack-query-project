import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate,useParams,Link,useNavigationType} from "react-router-dom";
import boardClient from "../../board-commons";
interface BoardDetailProps {
    NO: number,
    NAME: string,
    SUBJECT: string,
    CONTENT: string,
    DBDAY: string,
    HIT: number
}
function BoardDetail() {
    const {no}=useParams()
    const type=useNavigationType()
    console.log(type)
    const nav= useNavigate()

    // 데이터 받기
    const {isLoading,isError,error,data,refetch:boardDetail}=useQuery<{data: BoardDetailProps}>({
        queryKey:['board-detail',no],
        queryFn:async()=>{
            return await boardClient.get(`/board/detail_node?no=${no}`)
        }
    })

    useEffect(()=>{
       if(type!='POP'){
            boardDetail()
       }
    },[])

    if(isLoading) return <h1>Loading...</h1>
    if(isError) return <h1>Error: {error.message}</h1>

    const board=data?.data
    console.log(board)

    return (
        <div className="board-page">

            <div className="page-title">
                <h1>자유게시판</h1>
                <p>회원들과 자유롭게 이야기를 나눠보세요.</p>
            </div>

            <div className="board-detail">

                <div className="board-detail-title">

                    <h2 id="subject">
                        {board?.SUBJECT}
                    </h2>

                    <div className="board-detail-info">

                <span>
                    작성자&nbsp;
                    <strong id="name">{board?.NAME}</strong>
                </span>

                        <span>
                    작성일&nbsp;
                    <strong id="regdate">{board?.DBDAY}</strong>
                </span>

                        <span>
                    조회&nbsp;
                    <strong id="hit">{board?.HIT}</strong>
                </span>

                    </div>

                </div>

                <div
                    className="board-detail-content"
                    id="content">
                    {board?.CONTENT}
                </div>

                <div className="board-prev-next">

                    <div >

                        <span>▲ 이전글</span>

                        <strong id="prevSubject">
                            Node.js 서버 기본 사용법
                        </strong>

                    </div>


                    <div >

                        <span>▼ 다음글</span>

                        <strong id="nextSubject">
                            Express REST API 만들기
                        </strong>

                    </div>

                </div>

                <div className="board-detail-buttons">

                    <button
                        className="board-back-btn"
                        onClick={()=>nav("/board/list")}>
                        목록
                    </button>

                    <div>

                        <button
                            className="board-edit-btn"
                            onClick={() => nav(`/board/update/${board?.NO}`)}>
                            수정
                        </button>

                        <button
                            className="board-delete-btn"
                            onClick={() => nav(`/board/delete/${board?.NO}`)}>
                            삭제
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default BoardDetail