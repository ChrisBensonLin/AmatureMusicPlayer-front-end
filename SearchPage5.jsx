import React, { Component } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";

class SearchPage extends Component {
  state = {
    musicData: [{}],
    searchList: [{}],
    MusicListID: [
      {
        UserID: 1, //
        MusicID: 1
      }
    ],
    MusicIndex: 0,
    MusicListText: '新增成功',
    deleteMusicListText: "刪除成功",
  };
  clickMusic = (e) => {

    if (e.target.getAttribute('class') == 'addMusic') {
      return
    } else {
      this.state.MusicIndex = (e.target.getAttribute('data-num')) - 1
      this.url = `${this.state.musicData[this.state.MusicIndex].MusicMp3}`
      console.log(this.url);
      this.setState({})
      console.log('index 正確的' + this.state.MusicIndex);
      localStorage.setItem('MusicIndex', JSON.stringify(this.state.MusicIndex))
      const myPlayList = document.querySelectorAll('.myPlayList')
      const ListMusic = document.querySelectorAll('.ListMusic')

      ListMusic.forEach((item, index) => {
        item.classList.remove('active')
      })
      myPlayList.forEach((item, index) => {
        item.classList.remove('active')
      })
      myPlayList[localStorage.getItem('MusicIndex')].classList.add('active')
      this.setState({})
    }
  }
  //新增音樂到歌單
  ClickAddMusic = async (e) => {
    console.log(e.target.getAttribute('data-num'));//musicID
    if (e.target.getAttribute('class') !== 'addMusic' && document.cookie == "") {
      return
    } else {
      this.state.MusicListID[0].MusicID = e.target.getAttribute('data-num')
      this.state.MusicListID[0].UserID = document.cookie
      this.setState({})
      console.log(this.state.MusicListID);
      let result = await Axios.post
        ("http://localhost:9000/MusicList/add", this.state.MusicListID)
        .then((response) => { // 成功後要做的事
          console.log(response);
          if (response.data.affectedRows === 1) {

            this.setState({ MusicListText: '新增成功' })
          } else {

            console.log('已有重複歌曲');
            this.setState({ MusicListText: '已有重複歌曲' })
          }

        })
        .catch((error) => console.log(error))

      this.setState({})
      let allMusicList = await Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)

      this.setState({ allMusicList: allMusicList.data })
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if (localStorage.getItem('MusicIndex') !== this.state.MusicIndex) {
      this.setState({ MusicIndex: localStorage.getItem('MusicIndex') })
      console.log('index local 正確的' + this.state.MusicIndex);
    }
    if (localStorage.getItem('MusicIndex') == null) {
      localStorage.setItem('MusicIndex', 0)
    }
  }
  render() {
    return (
      <>
        <div className="container py-20">
          <section className="py-20">
            {/* <div className="d-flex justify-content-between"> */}
            <div className="d-flex pb-15 border-bottom-secondery">
              <div className="d-flex">
                <h2 className="fs-2">搜尋結果 : </h2>
                <p className="fs-3 ms-3">重金屬</p>
              </div>
              {/* <div>
              <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
            </div> */}
            </div>
            {this.state.searchList.map((item, idx) => (
              <div className="channel_songList row pt-8 pb-8 px-4  border-bottom-secondery heartDiv" idx={item.MusicID}>
                <div className="col-md-2 col-4 imgContainer" data-num={item.MusicID}>
                  <div className="musicDiv" data-num={item.MusicID}>
                    <img data-num={item.MusicID} src={item.MusicImage} alt="" className="imgContent musicImg" />
                  </div>
                  <div className="imgPalyIconSearch" data-num={item.MusicID}>
                    <button type="button" className="btn" data-num={item.MusicID} onClick={this.clickMusic}>
                      <img
                        src="/images/icon/play_circle_outline_white_48dp.svg"
                        alt="play"
                        data-num={item.MusicID}
                      />
                    </button>
                  </div>
                </div>
                <div className="col-md-2 m-auto col-6">
                  <NavLink className="hvr-underline-from-center-secondry" to={`/channel/${item.UserID}`}>
                    {item.MusicName}
                  </NavLink>
                </div>
                <div className="col-md-2 m-auto  d-none d-md-block">
                  <NavLink className="hvr-underline-from-center-secondry" to={`/channel/${item.UserID}`}>
                    {item.Singer}
                  </NavLink>
                </div>
                <div className="col-md-3 m-auto d-none d-md-block">
                  <NavLink className="hvr-underline-from-center-secondry" to={`/channel/${item.UserID}`}>
                    {item.Album}
                  </NavLink>
                </div>
                <div className="col-md-1 m-auto d-none d-md-block">
                  <span className="time">{item.MusicTime}</span>
                </div>
                <div className="col-md-1 m-auto col-1">
                  <button onClick={this.ClickAddMusic} type="button" className="btn hvr-bounce-in" data-num={item.MusicID} data-bs-toggle="modal" data-bs-target="#exampleModal9">
                    <img data-num={item.MusicID} src="/images/icon/plus-solid 1.png" alt="like" />
                  </button>
                </div>
                <div className="col-md-1 m-auto col-1">
                  <button type="button" className="btn hvr-bounce-in" onClick={() => { this.changeHeart(item.MusicID) }}>
                    <img src="/images/icon/heart.png" alt="" className="heartIcon" />
                    <img src="/images/icon/heart2.png" alt="" className="heartIcon2 d-none" />
                  </button>
                </div>
              </div>
            ))}
          </section>
          <div className="mt-20 text-center">
            <NavLink to="/" className="btn btn-xl btn-gradation">返回</NavLink>
          </div>
        </div>
        <div class="modal fade" id="exampleModal9" tabindex="-1" aria-labelledby="exampleModalLabel9" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content modal-bg bg-dark">
              <div class="modal-body text-center">
                {this.state.MusicListText}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  componentDidMount = async () => {
    let result = await Axios.get("http://localhost:9000/search/金屬");
    this.setState({ searchList: result.data });
    // 誰的user的所有歌單音樂
    let allMusicList = await Axios.get(`http://localhost:9000/MusicList/${document.cookie == "" ? "" : document.cookie}`)
    this.setState({ allMusicList: allMusicList.data })

    let MusicData = await Axios.get("http://localhost:9000/music");
    this.setState({ musicData: MusicData.data });

    if (localStorage.getItem('MusicIndex') == null) {
      localStorage.setItem('MusicIndex', 0)
    }
  }

  changeHeart = (MusicID) => {
    let temp = document.querySelectorAll('.heartDiv');
    let icon = document.querySelectorAll('.heartIcon');
    let icon2 = document.querySelectorAll('.heartIcon2');

    console.log(MusicID);
    for (var i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].attributes.idx.value) === MusicID) {
        console.log(MusicID, "ok");

        console.log(icon[i])
        console.log(icon2[i])
        if (icon[i].attributes.class.value.indexOf("d-none") > -1) {
          icon[i].classList.remove("d-none");
          icon2[i].classList.add("d-none")
        } else {
          icon[i].classList.add("d-none");
          icon2[i].classList.remove("d-none")
        }
      } else {
        console.log("NO")
      }

    }

  }
}

export default SearchPage;
