import React, {Component} from 'react'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = { term: '' }
    let mediaRecorder = null
    let recordedBlobs = null
    let superBuffer = null
  }

  handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data)
    }
  }
  
  handleStop(event) {
    console.log('Recorder stopped: ', event)
  }

  onListenButtonClick () {
    if (this.refs.listen.textContent === "Listen") {
      this.recordedBlobs = []
      const options = { mimeType: 'audio/webm' }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
      }
      try {
        this.mediaRecorder = new MediaRecorder(window.stream, options);
      } catch (e) {
        console.error('Exception while creating MediaRecorder: ' + e)
        alert('Exception while creating MediaRecorder: ' + e + '. mimeType: ' + options.mimeType)
        return
      }
      console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
      this.refs.listen.textContent = "Stop Listen"
      // recordButton.textContent = 'Stop Recording';
      // playButton.disabled = true;
      // downloadButton.disabled = true;
      this.mediaRecorder.onstop = this.handleStop
      this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this)
      this.mediaRecorder.start(10); // collect 10ms of data
      console.log('MediaRecorder started', this.mediaRecorder);
    } else {
      this.mediaRecorder.stop()
      this.refs.listen.textContent = "Listen"
      console.log('Recorded Blobs: ', this.recordedBlobs)

      this.superBuffer = new Blob(this.recordedBlobs, {type: 'audio/x-raw'});
      console.log(this.superBuffer)
      console.log(this.props.parent.audio)
      this.props.parent.audio.src = window.URL.createObjectURL(this.superBuffer);
    }
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

}

export default SearchBar