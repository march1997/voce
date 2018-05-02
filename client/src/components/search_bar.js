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
      server : "ws://localhost:10101/client/ws/speech",
      serverStatus : "ws://localhost:10101/client/ws/status",
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
        // console.log(`available: ${json.num_workers_available}`)
        if (json.num_workers_available > 0) {
          this.refs.listen.disabled = false
          this.refs.listen.classList.remove("deactive-listen")
          this.refs.listen.classList.add("active-listen")
        } else {
          this.refs.listen.disabled = true
          this.refs.listen.classList.remove("active-listen")
          this.refs.listen.classList.add("deactive-listen")
        }
      },
      // onPartialResults : (hypos) => {
        // console.log(`onPartialResults: ${hypos[0].transcript}`)
      // },
      onResults : (hypos) => {      
        const result = hypos[0].transcript
        console.log(`onResults: ${result.replace(/\s/g,'').replace('.','')}`)
        // console.log(result.split(" ")[0])
        this.handleResult(result)
        if (this.refs.listen.className === "deactive-listen") {
          this.onListenButtonClick()
        }
      },
      onError : (code, data) => {
        console.log(`onError: ${code}, ${data}`)
        // this.dictate.cancel();
      },
      // onEvent : function(code, data) {
      //   console.log(`onEvent: ${code}, ${data}`)
      // }
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

  handleResult (str) {
    const splitStr = str.split(" ")
    const trimStr = str.replace(' ', '').replace('.', '').trim()
    if (splitStr[0] === 'เสิร์ช' || splitStr[0] === 'ค้นหา' || splitStr[0] === 'ช่วยหา' || splitStr[0] === 'หา') {
      const term = splitStr.reduce((acc, currVal, currIdx, array) => {
        return currIdx === 1 ? currVal : `${acc} ${currVal}`
      }).replace('.','').trim()

      this.refs.search.value = term
      this.setState({ term })
      this.props.onSearchTermChange(term)
    } else if (trimStr === 'เล่นวิดิโอ' || trimStr === 'เล่นวีดิโอ' || trimStr === 'เล่นวิดีโอ' || trimStr === 'เล่นวีดีโอ') {
      this.props.player.playVideo()
    } else if (trimStr === 'หยุดวิดิโอ' || trimStr === 'หยุดวีดิโอ' || trimStr === 'หยุดวิดีโอ' || trimStr === 'หยุดวีดีโอ') {
      this.props.player.pauseVideo()
    } else if (trimStr === 'เปิดเสียง') {
      this.props.player.unMute()
    } else if (trimStr === 'เงียบ' || trimStr === 'ปิดเสียง') {
      this.props.player.mute()
    } else if (trimStr === 'เร่งความเร็ว') {
      switch (this.props.player.getPlaybackRate()) {
        case 0.25:
          this.props.player.setPlaybackRate(0.5)
          break
        case 0.5:
          this.props.player.setPlaybackRate(1)
          break
        case 1:
          this.props.player.setPlaybackRate(1.5)
          break
        case 1.5:
          this.props.player.setPlaybackRate(2)
          break
        default:
          break
      }
    } else if (trimStr === 'ชะลอความเร็ว') {
      switch (this.props.player.getPlaybackRate()) {
        case 0.5:
          this.props.player.setPlaybackRate(0.25)
          break
        case 1:
          this.props.player.setPlaybackRate(0.5)
          break
        case 1.5:
          this.props.player.setPlaybackRate(1)
          break
        case 2:
          this.props.player.setPlaybackRate(1.5)
          break
        default:
          break
      }
    } else if (splitStr[0] === 'ข้ามไป') {
      switch (splitStr[2]) {
        case 'หนึ่ง':
          this.props.player.seekTo(60)
          break
        case 'สอง':
          this.props.player.seekTo(120)
          break
        case 'สาม':
          this.props.player.seekTo(180)
          break
        case 'สี่':
          this.props.player.seekTo(240)
          break
        case 'ห้า':
          this.props.player.seekTo(300)
          break
        case 'หก':
          this.props.player.seekTo(360)
          break
        case 'เจ็ด':
          this.props.player.seekTo(420)
          break
        case 'แปด':
          this.props.player.seekTo(480)
          break
        case 'เก้า':
          this.props.player.seekTo(540)
          break
        case 'สิบ':
          this.props.player.seekTo(600)
          break
        default:
          break
      }
    }
  }

  onListenButtonClick () {
    console.log(this.refs.listen.className)
    if (this.refs.listen.className === "active-listen") {
      // this.refs.listen.textContent = "Stop Listen"
      // this.refs.listen.disabled = true
      // this.refs.listen.classList.remove("active-listen")
      // this.refs.listen.classList.add("deactive-listen")
      this.dictate.startListening()
    } else {
      // this.refs.listen.textContent = "Listen"
      // this.refs.listen.disabled = false
      // this.refs.listen.classList.remove("deactive-listen")
      // this.refs.listen.classList.add("active-listen")
      this.dictate.cancel()
      // this.dictate.stopListening()
      // setTimeout(() => { this.dictate.cancel() }, 1500)
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
        <input className="search-input" ref="search" onChange={ event => this.onInputChange(event.target.value) } />
        <button className="deactive-listen" ref="listen" onClick={ this.onListenButtonClick.bind(this) }>Listen</button>
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