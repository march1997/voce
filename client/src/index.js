import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
// import Example from './components/mic_rec'
const API_KEY = 'AIzaSyB_8kDNk0OpSz_OBJtOWcFInO4LyBQSrYU'

class App extends Component {
  constructor (props) {
    super(props)
		
    this.state = { 
      videos: [],
      selectedVideo: null,
      player: null
    }

		this.initialVideoSearch()
		// navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(this.handleSuccess)
	}

  initialVideoSearch () {
    YTSearch({ key: API_KEY, term: 'Doraemon' }, (videos) => {
			this.setState({ 
				videos,
				selectedVideo: videos[0]
			})
		})
  }

  videoSearch (term) {
    YTSearch({ key: API_KEY, term }, (videos) => {
      this.setState({ 
        videos,
        selectedVideo: videos[0]
      })
    })
  }

  handleSuccess(stream) {
		let audio = this.refs.audio
		let audioTracks = stream.getAudioTracks();
		console.log('Got stream with constraints:', constraints);
		console.log('Using audio device: ' + audioTracks[0].label);
		stream.oninactive = function() {
			console.log('Stream ended');
		};
		window.stream = stream; // make variable available to browser console
		// audio.srcObject = stream;
		// console.log(stream)
	}

	handleError(error) {
		console.log('navigator.getUserMedia error: ', error);
	}

  componentDidMount () {
		const constraints = window.constraints = {
			audio: true,
		}

		// navigator.mediaDevices.getUserMedia(constraints).then(this.handleSuccess.bind(this)).catch(this.handleError)
	}

  render () {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 600)
    
    return (
      <div>
        {/* <Example /> */}
        {/* <audio ref="audio" controls autoPlay></audio> */}
        <SearchBar
          onSearchTermChange={ videoSearch }
          onVideoSelect={ selectedVideo => this.setState({ selectedVideo }) } 
          parent={ this.refs }
          player={ this.state.player } 
          videos={ this.state.videos } 
        />
        <VideoDetail 
          onYTPlayerReady={ player => this.setState({ player }) }
          video={ this.state.selectedVideo }
        />
        <VideoList 
          onVideoSelect={ selectedVideo => this.setState({ selectedVideo }) }
          videos={ this.state.videos } 
        />
      </div>      
    )
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.player !== prevState.player) {
      this.state.player.mute()
    }
  }
}

ReactDOM.render(<App />, document.querySelector('.container'))