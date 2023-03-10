import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogin: [{ userID: "" }],
            searchSinger: [{}],
            defaultSearch: [{ searchName: "" }],
            defaultUserId: [{ UserId: "" }]
        }
    }

    render() {
        return (

            <div className="navBackground bg-black-opacity-20 backdrop-blur">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between bg-black">
                    {/* logo */}
                    <div>
                        <NavLink to="/" onClick={this.MusicPlayerBlock}>
                            <img src="/images/icon/AMATEURLog.png" alt="" />
                        </NavLink>
                    </div>
                    <div className=" d-flex">
                        <div className="box me-10">
                            {/* search button */}
                            <div className="searchContainer searchDropdown">
                                <span className="icon" onclick={this.dropdownClose}>
                                    <i class="fa fa-search"></i>
                                </span>
                                <input
                                    type="search"
                                    id="search"
                                    placeholder="Search..."
                                    onClick={this.mysearchFunction}
                                    className="searchDropbtn"
                                />
                            </div>
                            <div
                                id="mySearchDropdown"
                                className="searchDropdown-content container mt-2 pe-8 bg-black"
                            >
                                <div className="text-end pt-3">
                                    <button type="button" class="btn-close btn-close-white" aria-label="Close"
                                        onClick={this.CloseShow}></button>
                                </div>
                                <div className="py-5 d-flex">
                                    <input
                                        type="search"
                                        id="search"
                                        name="search"
                                        placeholder="????????????????????????..."
                                        className=" form-control w-75"
                                        value={this.state.defaultSearch[0].searchName}
                                        onChange={e => {
                                            let newState = { ...this.state }
                                            newState.defaultSearch[0].searchName = e.target.value
                                            this.setState({ newState });
                                        }}
                                    />
                                    <div>
                                        <a href={`/searchSinger/${this.state.defaultUserId[0].UserId}`} className="btn btn-md btn-gradation rounded-pill ms-5"
                                            style={{ width: '80px' }}
                                            onClick={this.searchSinger}
                                        >??????</a>
                                    </div>
                                </div>
                                {/* type button */}
                                <div className="d-flex">
                                    <NavLink to="/search/??????"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        ??????
                                    </NavLink>
                                    <NavLink to="/search/??????"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        ??????
                                    </NavLink>
                                    <NavLink to="/search/??????"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        ??????
                                    </NavLink>
                                </div>
                                <div class="d-flex pb-5">
                                    <NavLink to="/search/Funk"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        Funk
                                    </NavLink>
                                    <NavLink to="/search/?????????"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        ?????????
                                    </NavLink>
                                    <NavLink to="/search/R&B"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        R&B
                                    </NavLink>
                                </div>
                                {/* <hr /> */}
                                <div class="py-5 text-center">
                                    {/* <span class="fs-5 searchResult">???????????????</span> */}
                                    {/* <button
                                        type="button"
                                        className="btn btn-gradation rounded-pill me-3"
                                        style={{ width: '80px' }}
                                    >
                                        ??????
                                    </button> */}
                                </div>
                                {/* <div className="p-5 text-gray">
                                    <p className="fs-5">??????</p>
                                    <p className="fs-5 . my-2">????????????</p>
                                </div> */}
                            </div>
                        </div>
                        {/* login button */}
                        <div className="pe-5">{(document.cookie == "") ?
                            <NavLink to="/login" className="btn btn-xl btn-gradation rounded-pill ">??????</NavLink> :
                            <div class="dropdown">
                                <button class="btn btn-m dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* <img src="/images/icon/person_white_24dp.svg" alt="" className="navLoginIcon " /> */}
                                    <span className="fs-4 mt-5 text-gray">????????????</span>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton2" style={{ width: '180px' }}>
                                    <li className="text-center "><img src={this.state.userLogin[0].UserImage} alt="" className="border border-secondary border-3 rounded-circle" width="100px" /></li>
                                    {/* <li className="text-center mt-2"><p className="fs-5 text-decoration-underline">{this.state.userLogin[0].UserName}</p></li> */}
                                    <li className="text-center mt-5"><NavLink to={`/member/${document.cookie}`} class="dropdown-item fs-4 " onClick={this.MusicPlayerNone}>????????????</NavLink></li>
                                    <li className="text-center mt-2"><a class="dropdown-item fs-4" href="#" onClick={this.logout}>??????</a></li>
                                    {/* <li className="text-center mt-5"><button class="dropdown-item btn btn-s btn-gradation rounded-pill w-75 m-auto">??????</button></li> */}
                                </ul>
                            </div>
                        }
                        </div>
                    </div>
                </nav >
            </div >
        )

    }
    //???????????????????????? ?????????????????????
    MusicPlayerNone = () => {
        document.querySelector('.control-container').classList.add('d-none')


    }
    //????????????LOGO????????? ?????????????????????
    MusicPlayerBlock = () => {
        document.querySelector('.control-container').classList.remove('d-none')
    }
    logout = (e) => {
        var cookies = document.cookie.split(";");
        var cookie = cookies[0];
        var eqPos = cookie.indexOf("=");
        document.cookie = cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.location.href = "http://localhost:3000/";
    }
    componentDidMount = async () => {
        let result = await Axios.get("http://localhost:9000/search/singer");
        this.setState({ searchList: result.data });

        let resultUser = await Axios.get("http://localhost:9000/loginUser/1");
        this.setState({ userLogin: resultUser.data })

    };

    searchSinger = () => {
        var searchUserID = "";
        if (this.state.defaultSearch[0].searchName === "????????????") {
            searchUserID = 1;
        } else if (this.state.defaultSearch[0].searchName === "?????????") {
            searchUserID = 2;
        } else if (this.state.defaultSearch[0].searchName === "?????????") {
            searchUserID = 3;
        } else if (this.state.defaultSearch[0].searchName === "?????????") {
            searchUserID = 4;
        } else if (this.state.defaultSearch[0].searchName === "???????????????") {
            searchUserID = 5;
        } else if (this.state.defaultSearch[0].searchName === "????????????") {
            searchUserID = 6;
        } else if (this.state.defaultSearch[0].searchName === "P!SCO") {
            searchUserID = 7;
        } else if (this.state.defaultSearch[0].searchName === "??????????????????") {
            searchUserID = 8;
        } else {

            // window.location = Error
        }

        let newState = { ...this.state }
        newState.defaultUserId[0].UserId = searchUserID;
        this.setState({ newState });
        console.log(searchUserID)
        console.log(this.state.defaultUserId[0].UserId)
        // let result = Axios.get(`http://localhost:9000/search/singer/${searchUserID}`);
        // this.setState({ defaultSearch: result.data });


        console.log(this.state.defaultUserId[0])





    }
    mysearchFunction = () => {
        document.getElementById("mySearchDropdown").classList.toggle("show");
    }
    CloseShow = () => {
        document.getElementById("mySearchDropdown").classList.remove("show");
    }
    // Close the dropdown if the user clicks outside of it
    dropdownClose = (event) => {
        if (!event.target.matches('.searchDropbtn')) {
            var dropdowns = document.getElementsByClassName("searchDropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


}

export default Navigation;