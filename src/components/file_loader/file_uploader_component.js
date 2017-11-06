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
      <div style={{width: '100%', height: '100%'}}>
        <form style={{width: '100%', height: '100%'}} className="d-flex justify-content-center align-items-end">

          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
          }

          <label htmlFor="avatar-uploader" id="avatar-uploader-label">
            <FontAwesome name="picture-o" className="mr-2"/>
            Change an image
          </label>

          <FileUploader
            id="avatar-uploader"
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
