import React, { Component } from 'react'
import YouTube from 'react-youtube'

export default class VideoDetail extends Component {
  constructor(props) {
    super(props)
    if (this.props.video) {
      const videoId = this.props.video.id.videoId
      const url = `https://www.youtube.com/embed/${videoId}`
      const opts = {
        playerVars: {
          autoplay: 1,
        }
      }
    }
  }
  _onReady (event) {
    this.props.onYTPlayerReady(event.target)
    event.target.pauseVideo()
  }

  render () {
    if (!this.props.video) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="videoDetail col-md-8">
          <div className="embed-responsive embed-responsive-16by9">
            <YouTube
              videoId={ this.videoId }
              className="embed-responsive-item"
              opts = { this.opts }
              onReady={ this._onReady.bind(this) }
            />
            {/* <iframe id="yt-iframe" className="embed-responsive-item" src={ url }></iframe> */}
          </div>
          <div className="details">
            <h3>{ this.props.video.snippet.title }</h3>
            <p>{ this.props.video.snippet.description }</p>
          </div>
        </div>
      )
    }
  }
}

// let player = null

// const VideoDetail = ({ onYTPlayerReady, video }) => {
//   if (!video) {
//     return <div>Loading...</div>
//   }
//   const videoId = video.id.videoId
//   const url = `https://www.youtube.com/embed/${videoId}`
//   const opts = {
//     playerVars: {
//       autoplay: 1,
//     }
//   }

//   return (
//     <div className="videoDetail col-md-8">
//       <div className="embed-responsive embed-responsive-16by9">
//         <YouTube
//           videoId={ videoId }
//           className="embed-responsive-item"
//           opts = { opts }
//           onReady={ (event) => _onReady(event) }
//         />
//         {/* <iframe id="yt-iframe" className="embed-responsive-item" src={ url }></iframe> */}
//       </div>
//       <div className="details">
//         <h3>{ video.snippet.title }</h3>
//         <p>{ video.snippet.description }</p>
//       </div>
//     </div>
//   )
// }

// const _onReady = (event) => {
//   console.log(event.target)
//   onYTPlayerReady(event.target)
//   event.target.pauseVideo()
// }

// export default VideoDetail