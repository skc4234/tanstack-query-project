import {FoodListData} from "./commonsData";
import {FC} from "react";

interface PagePrintProps {
    data: FoodListData,
    setCurpage: (page: number) => void
}

// FC => Function Component(함수형 컴포넌트)
/*
    function App() {
        return (

        )
    }

    TypeScript: FC 타입을 이용
    const App:FC=()=>{
        return (

        )
    }
 */
const PagePrint: FC<PagePrintProps>=({data,setCurpage})=>{
    const {curpage,totalpage,startpage,endpage}=data
    const pageArr=[]
    const prev=()=>setCurpage(startpage-1)
    const next=()=>setCurpage(endpage+1)
    const pageChange=(page: number)=>setCurpage(page)
    if(startpage>1) {
        pageArr.push(
            <a className="page-arrow" onClick={()=>pageChange(startpage-1)}>
                ‹
            </a>
        )
    }
    for(let i:number=startpage; i<=endpage; i++){
        pageArr.push(
            <a className={`page ${i===curpage?'active':''}`} onClick={()=>pageChange(i)}>
                {i}
            </a>
        )
    }
    if(endpage<totalpage){
        pageArr.push(
            <a className="page-arrow" onClick={()=>pageChange(endpage+1)}>
                ›
            </a>
        )
    }
    return (
        <nav className="pagination">
            {pageArr}
        </nav>
    )
}

export default PagePrint