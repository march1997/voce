import React, {Component} from 'react'
import axios from 'axios'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = { term: '', superBuffer: null }
    this.mediaRecorder = null
    this.recordedBlobs = null
    // let superBuffer = null

    this.dictate = this.initializeDictate()
    this.dictate.init()
  }

  initializeDictate () {
    return new Dictate({
      server : "ws://localhost:8080/client/ws/speech",
      serverStatus : "ws://localhost:8080/client/ws/status",
      recorderWorkerPath : '/lib/recorderWorker.js',
      onReadyForSpeech : () => {
        console.log("READY FOR SPEECH")
      },
      onEndOfSpeech : () => {
        console.log("END OF SPEECH")
      },
      onEndOfSession : function() {
        console.log("END OF SESSION")
      },
      onServerStatus : (json) => {
        console.log(`available: ${workerjson.num_workers_available}`)
      },
      onPartialResults : (hypos) => {
        console.log(`onPartialResults: ${hypos[0].transcript}`)
      },
      onResults : (hypos) => {        
        console.log(`onResults: ${hypos[0].transcript}`)
      },
      onError : (code, data) => {
        console.log(`onError: ${code}, ${data}`)
        dictate.cancel();
      },
      onEvent : function(code, data) {
        console.log(`onEvent: ${code}, ${data}`)
      }
    })
  }

  handleDataAvailable (event) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data)
    }
  }
  
  handleStop (event) {
    console.log('Recorder stopped: ', event)
  }

  onListenButtonClick () {
    if (this.refs.listen.textContent === "Listen") {
      this.refs.listen.textContent = "Stop Listen"
      this.dictate.startListening()
    } else {
      this.refs.listen.textContent = "Listen"
      this.dictate.stopListening()
    }
    // if (this.refs.listen.textContent === "Listen") {
    //   this.recordedBlobs = []
    //   const options = { mimeType: 'audio/webm' }
    //   if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    //     console.log(options.mimeType + ' is not Supported');
    //   }
    //   try {
    //     this.mediaRecorder = new MediaRecorder(window.stream, options);
    //   } catch (e) {
    //     console.error('Exception while creating MediaRecorder: ' + e)
    //     alert('Exception while creating MediaRecorder: ' + e + '. mimeType: ' + options.mimeType)
    //     return
    //   }
    //   console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
    //   this.refs.listen.textContent = "Stop Listen"
    //   // recordButton.textContent = 'Stop Recording';
    //   // playButton.disabled = true;
    //   // downloadButton.disabled = true;
    //   this.mediaRecorder.onstop = this.handleStop
    //   this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this)
    //   this.mediaRecorder.start(10); // collect 10ms of data
    //   console.log('MediaRecorder started', this.mediaRecorder);
    // } else {
    //   this.mediaRecorder.stop()
    //   this.refs.listen.textContent = "Listen"
    //   console.log('Recorded Blobs: ', this.recordedBlobs)

    //   this.setState({ term: this.state.term, superBuffer: new Blob(this.recordedBlobs, {type: 'audio/x-raw'}) })
    // }
  }

  onInputChange (term) {
    this.setState({ term })
    this.props.onSearchTermChange(term)
  }

  
  render () {
    return (
      <div className="search-bar">
        <button ref="listen" onClick={ this.onListenButtonClick.bind(this) }>Listen</button>
        <input className="search-input" onChange={ event => this.onInputChange(event.target.value) } />
      </div>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.superBuffer !== this.state.superBuffer) {
      console.log('superBuffer: ',this.state.superBuffer)
      this.props.parent.audio.src = window.URL.createObjectURL(this.state.superBuffer)
      axios({
        method: 'post',
        url: '/',
        baseURL: 'http://server:port/client/dynamic/recognize',
        crossDomain: true,
        data: {
          blob: this.state.superBuffer
        }
      }).then(res => {
        switch(res) {
          case 'play':
            this.props.player.playVideo()
          case 'pause':
            this.props.player.pauseVideo()
          case 'increaseSpeed':
            this.props.player.setPlaybackRate(2)
          case 'setVolume':
            this.props.player.setVolume(50)
          case 'mute':
            this.props.player.mute()
          case 'unMute':
            this.props.player.unMute()
          case 'seekTo':
            this.props.player.seekTo(360)
          case 'playAt':
            this.props.onVideoSelect(this.props.videos[2])
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

export default SearchBar