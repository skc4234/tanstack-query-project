import {useState, useRef, ChangeEvent} from "react";
import {useQuery} from "@tanstack/react-query";
import {YoutubeApi} from "./YoutubeAPI";
import {YoutubeItem} from "../../commons/commonsData";

function YoutubeFind(){
    const [fd,setFd] = useState<string>("맛집")
    const fdRef = useRef<HTMLInputElement>(null)
    const {isLoading,isError,error,data,refetch:find}=useQuery({
        queryKey:["youtube"],
        queryFn:async()=>{
            return YoutubeApi(fd)
        }
    })

    if(isLoading){
        return (
            <div
                className="youtube-loading"
                id="loading">

                YouTube 동영상을 검색하고 있습니다...

            </div>
        )
    }
    if(isError) return <h1>Error: {error.message}</h1>

    const findClick=()=>{
        if(!fd.trim()) return fdRef.current?.focus()
        if(fdRef.current) setFd(fdRef.current.value)
        find()
    }

    const list=data?.items
    console.log(data)
    console.log(list)
    return (
        <div className="youtube-page">

            <div className="youtube-header">

                <div className="youtube-title">

                    <h1>
                        YouTube 동영상
                    </h1>

                    <p>
                        원하는 동영상을 검색해보세요.
                    </p>

                </div>

            </div>


            <div className="youtube-search">

                <div className="youtube-search-box">

            <span>
                🔍
            </span>


                    <input
                        type="text"
                        id="searchInput"
                        placeholder="검색어를 입력하세요"
                        value={fd}
                        ref={fdRef}
                        onChange={(e) => setFd(e.target.value)}
                    />


                    <button onClick={()=>findClick()}>


                        검색

                    </button>

                </div>

            </div>


            <div className="youtube-result-header">

                <strong>
                    검색 결과
                </strong>

            </div>
            <div
                className="youtube-list"
                id="youtubeList">
                {
                    list?.map((video:YoutubeItem,index)=>
                        <>
                        <div className={"youtube-thumbnail"} key={index}>
                            <iframe src={"https://www.youtube.com/embed/"+video.id.videoId}></iframe>
                        </div>
                        <div className={"youtube-content"}>
                            <div className={"youtube-card-title"}>
                                {video.snippet.title}
                            </div>
                        </div>
                        </>
                    )
                }
            </div>

        </div>

    )
}
export default YoutubeFind