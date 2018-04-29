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
		console.log(React.version)
    this.state = { 
      videos: [],
      selectedVideo: null
    }

		this.initialVideoSearch()
		// navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(this.handleSuccess)
	}

  initialVideoSearch () {
    YTSearch({ key: API_KEY, term: 'surfboards' }, (videos) => {
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
      })
    })
  }

  render () {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 600)
    
    return (
      <div>
				{/* <Example /> */}
        <SearchBar onSearchTermChange={ videoSearch }/>
        <VideoDetail video={ this.state.selectedVideo }/>
        <VideoList 
          onVideoSelect={ selectedVideo => this.setState({ selectedVideo }) }
          videos={ this.state.videos } 
        />
      </div>      
    )
  }
}

ReactDOM.render(<App />, document.querySelector('.container'))