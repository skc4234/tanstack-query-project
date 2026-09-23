// nodejs의 가장 간단한 서버
import express from "express"

// CrossOrigin
import cors from "cors"

import oracledb from "oracledb"

// 요청값을 받는다
import request from "request"

// 서버 설정
const app=express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 서버 구동 => 대기 상태 => 0~65535 => 0~1023은 이미 사용중인 포트
app.listen(3355,()=>{
    console.log("Server is running on port 3355","http://localhost:3355")
})


// 오라클 설정
/*
    React/TanStackQuery
        |
     Node Express
        |
      Oracle
 */
// SELECT 결과를 객체로 받는다
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT

oracledb.fetchAsString = [ oracledb.CLOB ]

// 오라클 연결 => username/password/url
async function getConnection(){
    return await oracledb.getConnection({
        username:'hr',
        password:'happy',
        connectionString:'127.0.0.1/xe'
    })
}

/*
    @GetMapping("/board/list_node")
    public String board_list(HttpServletRequest req,HttpServletResponse res) {
        String page=req.getParameter("page");
        if(page==null) page="1";
    }
 */
app.get("/board/list_node",async (req,res)=>{
    let conn
    const page: number=parseInt(req.query.page as string)||1
    const rowSize=10
    const start:number=(page*rowSize)-rowSize

    try {
        conn=await getConnection()
        const listsql=`
                    SELECT no,subject,name,TO_CHAR(regdate,'YYYY-MM-DD') as dbday,hit
                    FROM jspboard
                    ORDER BY no DESC
                    OFFSET ${start} ROWS FETCH NEXT 10 ROWS ONLY
                  `;
        const totalsql=`
                        SELECT CEIL(COUNT(*)/10.0) as totalpage FROM jspboard
                       `;
        const result=await conn.execute(listsql)
        const total=await conn.execute(totalsql)
        const totalpage=(total.rows as {TOTALPAGE: number}[])[0].TOTALPAGE
        console.log(result.rows)
        console.log(total.rows)
        console.log(totalpage)
        res.json({
            list:result.rows,
            curpage:page,
            totalpage:totalpage
        })
    } catch (error){
        console.error(error)
    } finally {
        if(conn){
            await conn.close()
        }
    }
})

// board_insert
app.post("/board/insert_node",async (req,res)=>{
    let conn
    const {name,subject,content,pwd}=req.body

    try {
        conn = await getConnection()
        const insertsql=`
                            INSERT INTO jspboard(name,subject,content,pwd)
                            VALUES(:name,:subject,:content,:pwd)
                        `
        await conn.execute(insertsql,{
            name,subject,content,pwd
        },{autoCommit:true})
        res.json({
            "msg":"yes"
        })
    } catch (err){
        console.error(err)
        res.status(500).send({error:err})
    } finally {
        if(conn){
            await conn.close()
        }
    }
})
/*
    1. 공통 모듈 => 반복 소스 제거(언어=>메소드화)
    2. 소스가 길때 => 나눠서 작업 / 알고리즘
    3. 누구나 볼 수 있게(가독성)

 */
app.get("/board/detail_node",async (req,res)=>{
    let conn
    const no=req.query.no||1
    try {
        conn = await getConnection()
        const sql1=`
                    UPDATE jspboard
                    SET hit=hit+1
                    WHERE no=${no}
                   `
        await conn.execute(sql1,{},{autoCommit:true})
        const sql2=`
                    SELECT no,subject,content,name,hit,TO_CHAR(regdate,'YYYY-MM-DD') as dbday
                    FROM jspboard
                    WHERE no=${no}
                   `
        const result=await conn.execute(sql2)
        res.json(result.rows?.[0])
    } catch (error){
        console.error(error)
    } finally {
        if(conn){
            await conn.close()
        }
    }
})

app.get("/board/update_node",async (req,res)=>{
    let conn
    const no=req.query.no||1
    try {
        conn=await getConnection()
        const sql=`
                    SELECT no,subject,content,name
                    FROM jspboard
                    WHERE no=${no}
                   `
        const result=await conn.execute(sql)
        res.json(result.rows?.[0])
    }catch (error){
        console.error(error)
    } finally {
        if(conn){
            await conn.close()
        }
    }
})

app.put("/board/update_ok_node",async (req,res)=>{
    let conn
    const {no,name,subject,content,pwd}=req.body
    console.log(pwd)
    try {
        conn=await getConnection()
        const checkSql=`
                    SELECT COUNT(*) as res
                    FROM jspboard
                    WHERE no=:no AND pwd=:pwd
                   `
        const check=await conn.execute(checkSql,{no,pwd})
        const count=(check.rows as any[])[0].RES
        console.log(check)
        if(count<1){
            res.json({msg:"no"})
        }
        else {
            const sql=`
                        UPDATE jspboard
                        SET name=:name, subject=:subject,content=:content
                        WHERE no=:no
                      `
            await conn.execute(sql,{name,subject,content,no},{autoCommit:true})
            res.json({msg:"ok"})
        }
    }catch (error){
        console.error(error)
    } finally {
        if(conn){
            await conn.close()
        }
    }
})

/*
    board/delete/1/1234 => PathVariable
                -------
                req.params.no
                req.params.pwd
    app.delete("/board/delete_no/:no/:pwd")
*/
app.delete("/board/delete_node/:no/:pwd",async (req,res)=>{
    let conn
    const {no,pwd}=req.params
    try {
        conn=await getConnection()
        const checkSql=`
                    SELECT COUNT(*) as res
                    FROM jspboard
                    WHERE no=:no AND pwd=:pwd
                   `
        const check=await conn.execute(checkSql,{no,pwd})
        const count=(check.rows as any[])[0].RES
        console.log(check)
        if(count<1){
            res.json({msg:"no"})
        }
        else {
            const sql=`
                        DELETE FROM jspboard WHERE no=:no
                      `
            await conn.execute(sql,{no},{autoCommit:true})
            res.json({msg:"ok"})
        }
    }catch (error){
        console.error(error)
    } finally {
        if(conn){
            await conn.close()
        }
    }
})