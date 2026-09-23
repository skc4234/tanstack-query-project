import {useState, useRef, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import boardClient from "../../board-commons";
import {AxiosError,AxiosResponse} from "axios";

/*
    1. React
        => 상태(state)에 따라서 UI를 선언적으로 표현하는 컴포넌트 기반의 라이브러리
        1) 컴포넌트 기반 UI
        2) 가상돔(임시메모리) 사용 => 속도가 빠르다
        3) 데이터 변경이 자동 렌더링
    2. 변수: - props
                - <App name="aaa" />
            - state
                - useState: setXxx => HTML 변환
    3. TanStack-Query
        - 서버 상태 / 클라이언트 상태 => isLoading / isError
        - 서버의 데이터 전송상태 관리
        - 캐싱 / 자동 refetch => 저장 => 같은 키가 있는 경우에는 서버에 연결하지 않는다
        - staleTime / cacheTime
           - 메모리에 남아있는 시간 => 시간이 지나면 자동 삭제
           - 새로운 데이터가 저장되기 전에는 재요청을 하지 않는다
        - React에서 가장 많이 사용
        - NextJS에서 수정없이 바로 사용가능
           - Vue / jQuery / React 호환
        - useQuery(SELECT) / useMutation(UPDATE,DELETE,INSERT)

     4. 현재 개발
        MSA => 서버 분산 => 화면 통일
            NodeJS   SpringBoot  Python
              |          |          |
              ------------------------
                         | => JSON
                      사용자 화면

      5. docker-compose / 쿠버네티스 : CI/CD



 */

interface BoardItem {
    NO: number,
    NAME: string,
    SUBJECT: string,
    CONTENT: string
}

interface BoardResponse {
    msg: string
}

function BoardUpdate(){
    const nav=useNavigate()
    /*
        name: 현재값
        setName(): 값 변경
     */
    // 입력된 값을 저장하는 용도(변수)
    const [name, setName] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [pwd, setPwd] = useState<string>("")

    // 태그를 제어하는 용도
    const nameRef=useRef<HTMLInputElement>(null)
    const subjectRef=useRef<HTMLInputElement>(null)
    const contentRef=useRef<HTMLTextAreaElement>(null)
    const pwdRef=useRef<HTMLInputElement>(null)

    const {no}=useParams()

    const {isLoading,isError,error,data}=useQuery<{data: BoardItem}>({
        queryKey:['board-update',no],
        queryFn: async()=>{
            return await boardClient.get<BoardItem>(`board/update_node?no=${no}`)
        }
    })

    const board=data?.data
    console.log(board)

    useEffect(() => {
        if(board){
            setName(board.NAME)
            setSubject(board.SUBJECT)
            setContent(board.CONTENT)
        }
    }, [board])

    const {mutate:boardUpdate}=useMutation({
        mutationFn: async()=>{
            return await boardClient.put('/board/update_ok_node',{
                name:name,
                subject:subject,
                content:content,
                pwd:pwd,
                no:no
            })
        },
        onSuccess:(res:AxiosResponse<BoardResponse>)=> {
            if (res.data.msg === 'ok') {
                console.log("ok")
                window.location.href = `/board/detail/${no}`
            } else {
                alert("비밀번호가 틀립니다!!!")
                setPwd("")
                pwdRef.current?.focus()
            }
        },
        onError:(err:Error)=> {
            console.log("Error 발생: ",err.message)
        }
    })

    // 이벤트 처리
    const update=()=>{
        if(!name.trim()) return nameRef.current?.focus()
        if(!subject.trim()) return subjectRef.current?.focus()
        if(!content.trim()) return contentRef.current?.focus()
        if(!pwd.trim()) return pwdRef.current?.focus()
        boardUpdate()
    }

    return (
        <main className="restaurant-page board-page">

            {/* 페이지 제목 */}
            <section className="page-title">

        <span>
            COMMUNITY
        </span>

        <h1>
        수정하기
        </h1>

        <p>
        맛집에 대한 이야기를 자유롭게 작성해주세요.
    </p>

    </section>


    {/* 글쓰기 폼 */}
    <section className="board-form">

    <div className="form-group">

        <label>
            제목
        </label>

        <input
    type="text"
    placeholder="제목을 입력해주세요."
    value={subject}
    ref={subjectRef}
    onChange={(e) =>
    setSubject(e.target.value)
}
    />

    </div>


    <div className="form-group">

        <label>
            작성자
        </label>

        <input
    type="text"
    placeholder="작성자를 입력해주세요."
    value={name}
    ref={nameRef}
    onChange={(e) =>
    setName(e.target.value)
}
    />

    </div>


    <div className="form-group">

        <label>
            내용
        </label>

        <textarea
    placeholder="내용을 입력해주세요."
    value={content}
    ref={contentRef}
    onChange={(e) =>
    setContent(e.target.value)
}
    />

    </div>

    <div className="form-group">

        <label>
            비밀번호
        </label>

        <input
    type="password"
    placeholder="비밀번호를 입력해주세요."
    value={pwd}
    ref={pwdRef}
    onChange={(e) =>
    setPwd(e.target.value)
}
    />

    </div>


    <div className="board-form-buttons">

    <button
        className="form-cancel-btn"
    onClick={() => nav(-1)}
>
    취소
    </button>

    <button
    className="form-submit-btn"
    onClick={()=>update()}
>
    등록하기
    </button>

    </div>

    </section>

    </main>
)
}

export default BoardUpdate