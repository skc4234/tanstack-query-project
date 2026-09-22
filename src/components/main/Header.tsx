function Header(){
    return (
        <header className="header">
            <a href="../index.html" className="logo">
                <span>📍</span>
                AI RESTAURANT
            </a>
            <nav>
                <div className="nav-item">
                    <a href="#">맛집</a>

                    <div className="sub-menu">
                        <a href="#">맛집</a>
                        <a href="#">주변 맛집</a>
                        <a href="#">인기 맛집</a>
                        <a href="#">평점 높은 맛집</a>
                    </div>
                </div>
                <div className="nav-item">
                    <a href="#">레시피</a>

                    <div className="sub-menu">
                        <a href="#">서울</a>
                        <a href="#">경기</a>
                        <a href="#">인천</a>
                        <a href="#">부산</a>
                        <a href="#">제주</a>
                    </div>
                </div>
                <div className="nav-item">
                    <a href="#">여행</a>

                    <div className="sub-menu">
                        <a href="#">여행</a>
                        <a href="#">AI 여행 코스</a>
                    </div>
                </div>

                <div className="nav-item">
                    <a href="#">커뮤니티</a>

                    <div className="sub-menu">
                        <a href="#">자유게시판</a>
                        <a href="#">챗봇</a>
                    </div>
                </div>
                <div className="nav-item">
                    <a href="#">AI 추천</a>

                    <div className="sub-menu">
                        <a href="#">AI 맛집 추천</a>
                        <a href="#">내 취향 추천</a>
                        <a href="#">메뉴 추천</a>
                        <a href="#">데이트 맛집</a>
                    </div>
                </div>

            </nav>
            <button className="login-btn">
                로그인
            </button>

        </header>
    )
}

export default Header