import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import PropTypes from 'prop-types';

class Uploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isUploading: false,
      progress: 0
    };
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  handleUploadStart () { this.setState({isUploading: true, progress: 0})};
  handleProgress (progress) { this.setState({progress})};

  handleUploadError (error) {
    this.setState({isUploading: false});
    console.error(error);
  }

  handleUploadSuccess (filename) {
    this.setState({progress: 100, isUploading: false});
    this.props.callback('images' + this.props.storagePath, filename);
  };

  render() {
    let p = this.props;

    return (
      <div>
        <form>
          <label>Photo:</label>
          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
          }

          <FileUploader
            accept="image/*"
            name="photo"
            filename={file => { return p.filename + file.name.split('.')[1];} }
            storageRef={firebase.storage().ref('images').child(p.storagePath)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}
Uploader.propTypes = {
  storagePath: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  filename: PropTypes.string.isRequired
};

export default Uploader;
