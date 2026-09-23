import {useState,useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import boardClient from "../../board-commons";
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";
import PagePrint from "../../commons/PagePrint";

interface BoardItem {
    NO: number,
    SUBJECT: string,
    NAME: string,
    DBDAY: string,
    HIT: number
}

interface BoardListData {
    list: BoardItem[],
    curpage: number,
    totalpage: number
}

function BoardList() {
    const [curpage, setCurpage] = useState<number>(1)
    const nav=useNavigate()
    const {isLoading, isError, error,data,refetch:hitIncrement}=useQuery<BoardListData,Error>({
        queryKey:['board-list',curpage],
        queryFn:async()=>{
            const res=await boardClient.get(`/board/list_node?page=${curpage}`)
            return res.data
        }
    })
    useEffect(() => {
        hitIncrement()
    }, [curpage]);
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return (
            <h1>Error: {error?.message}</h1>
        )
    }
    console.log(data)
    const list=data?.list ?? []
    const prev=()=>{
        setCurpage(curpage>1?curpage-1:curpage)
    }
    const next=()=>{
        setCurpage(data && curpage<data?.totalpage?curpage+1:curpage)
    }
    return (
        <main className="restaurant-page board-page">

            {/* 페이지 제목 */}
            <section className="page-title">

                <span>
                    COMMUNITY
                </span>

                <h1>
                    맛집 게시판
                </h1>

                <p>
                    맛집에 대한 다양한 이야기를 자유롭게 공유해보세요.
                </p>

            </section>



            {/* 게시판 헤더 */}
            <section className="board-header">

                <div>

                    <strong>
                        전체 게시글
                    </strong>

                    <span>
                        총 {list.length}개의 게시글
                    </span>

                </div>

                <button
                    className="board-write-btn"
                    onClick={() => nav("/board/insert")}
                >
                    ✏ 글쓰기
                </button>

            </section>


            {/* 게시판 */}
            <section className="board-list">

                <div className="board-list-head">
                    <span className="board-no">번호</span>
                    <span className="board-title">제목</span>
                    <span className="board-writer">작성자</span>
                    <span className="board-date">작성일</span>
                    <span className="board-hit">조회</span>
                </div>


                {list.map((vo:BoardItem) => (

                    <div
                        className="board-list-row"
                        key={vo?.NO}
                        onClick={() => nav(`/board/detail/${vo?.NO}`)}
                    >

                        <span className="board-no">
                            {vo?.NO}
                        </span>

                        <span className="board-title">

                            <strong>
                                {vo?.SUBJECT}
                            </strong>

                        </span>

                        <span className="board-writer">
                            {vo?.NAME}
                        </span>

                        <span className="board-date">
                            {vo?.DBDAY}
                        </span>

                        <span className="board-hit">
                            {vo?.HIT}
                        </span>

                    </div>

                ))}

            </section>


            {/* 페이지네이션 */}
            <div className="pagination">
                <a onClick={()=>prev()} style={{cursor: "pointer"}}>이전</a>
                {data && data.curpage} page / {data && data.totalpage} pages
                <a onClick={()=>next()} style={{cursor: "pointer"}}>다음</a>
            </div>

        </main>

    )
}

export default BoardList