import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import axios from 'axios';

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

 
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [["bold", "italic", "image"]],
    // # 4 Add module and upload function
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();

          formData.append("file", file);
          const config = {
            header: { 'content-type': 'multipart/form-data' }
          }
          
          axios.post('/uploadfiles', formData, config)
              .then(response => {
                  console.log(response)
                  if (response.data.success) {


                      const quill = this.reactQuillRef.getEditor();
                      quill.focus();

                      let range = quill.getSelection();
                      let position = range ? range.index : 0;

                      
                      quill.insertEmbed(position, "image", { src: "http://localhost:5000/" + response.data.url, width: 500, alt: response.data.fileName });
                      quill.setSelection(position + 1);

                      if (this._isMounted) {
                          this.setState({
                              files: [...this.state.files, file]
                          }, () => { this.props.onFilesChange(this.state.files) });
                      }
                  } else {
                     
                      return alert('failed to upload file')
                  }
              })
   



          
          // formData.append("image", file);
          
          // fetch(
          //   "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
          //   {
          //     method: "POST",
          //     body: formData
          //   }
          // )
          //   .then(response => response.json())
          //   .then(result => {
          //     resolve(result.data.url);
          //   })
          //   .catch(error => {
          //     reject("Upload failed");
          //     console.error("Error:", error);
          //   });
        });
      }
    }
  };

  // formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "imageBlot" // #5 Optinal if using custom formats
  // ];

  render() {
    return (
      <ReactQuill
        ref={(el) => { this.reactQuillRef = el }}
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={this.state.text}
      >
        <div className="my-editing-area" />
      </ReactQuill>
    );
  }
}

export default Editor;
