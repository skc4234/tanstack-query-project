/*
			map.put("list", list);
			map.put("search", search);
			map.put("curpage", page);
			map.put("totalpage", totalpage);
			map.put("startpage", startpage);
			map.put("endpage", endpage);
			map.put("count", count);

		==> FoodListData
		=> list => FoodItem
		=> TypeScript
		   정의: JavaScript에 데이터형을 추가하는 문법
		   동작
		        JavaScript
		            |
		        TypeScript
		            |
		        데이터형(타입) 검사
		            |
		       JavaScript로 변환
		            |
		       브라우저/실행 => 목적: 가독성 / 실행전에 오류를 발견


		   .ts  : 일반 TypeScript 파일
		   .tsx : TypsScript+JSX
		   .js  : 일반 JavaScript 파일
		   .jsx : JavaScript+XML

		 1. 기본 데이터형
		    string: 문자열 => let name: string = 값
		    number: 숫자(정수,실수)
		    boolean: true/false
		    array: 배열
		    object: 객체
		    tuple: 데이터베이스의 ROW와 동일 => 파이썬
		           {}, [], ()
		    any, unknown: 데이터형을 모르는 경우
		    void: 리턴형
		    null
		    undefined

		    - 데이터를 받을 경우 설계/규격
		    -*interface => VO
		        => interface User {
		                name: string,
		                age: number
		           }
		    -type: interface와 거의 동일
		        => React / Vue에서 주로 사용

		    - interface / type
		       UNION => 여러개의 데이터형을 설정 => type에만 적용
		                interface는 제한적
		             => type Status="READY"|"RUNNING"|"END"

		    let value: string|number
		    let value: any

		    - optional => ?
		      email?: string

		    - readonly
		      readonly no: number => 읽기 전용
 */

// VO
export interface FoodItem {
    no: number,
    poster: string,
    name: string,
    score: number,
    theme: string,
    type: string,
    address: string
}

// 전체 목록
export interface FoodListData {
    list: FoodItem[],
    curpage: number,
    totalpage: number,
    startpage: number,
    endpage: number,
    count: number,
    search: string
}

/*
NO         NOT NULL NUMBER
CNO                 NUMBER
NAME       NOT NULL VARCHAR2(100)
TYPE       NOT NULL VARCHAR2(200)
PHONE      NOT NULL VARCHAR2(20)
ADDRESS    NOT NULL VARCHAR2(500)
PRICE               VARCHAR2(30)
SCORE               NUMBER(2,1)
THEME      NOT NULL CLOB
TIME                VARCHAR2(50)
RESERVE             VARCHAR2(100)
PARKING    NOT NULL VARCHAR2(100)
CONTENT    NOT NULL CLOB
POSTER     NOT NULL VARCHAR2(260)
IMAGES              CLOB
LIKECOUNT           NUMBER
REPLYCOUNT          NUMBER
JJIMCOUNT           NUMBER
HIT                 NUMBER
 */
// FoodVO 상세 데이터
export interface FoodDetailItem {
    no: number,
    cno: number,
    name: string,
    type: string,
    phone: string,
    address: string,
    price: string,
    score: number,
    theme: string,
    time: string,
    reserve: string,
    parking: string,
    content: string,
    poster: string,
    images: string,
    likecount: number,
    replycount: number,
    jjimcount: number,
    hit: number
}

export interface YoutubeItem {
    id:{
        videoId: string
    }
    snippet: {
        title: string,
        description: string,
        thumbnail: {
            medium: {
                url: string
            }
        }
    }
}

export interface YoutubeResponse {
    items:YoutubeItem[];
}