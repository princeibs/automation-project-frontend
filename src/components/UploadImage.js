import React, { useEffect, useState } from "react";

const UploadImage = ({setImage, upload}) => {
  const init = () => {
    const cloudName = "hzxyensd5"; // replace with your own cloud name
    const uploadPreset = "aoh4fpwm"; // replace with your own upload preset

    // Remove the comments from the code below to add
    // additional functionality.
    // Note that these are only a few examples, to see
    // the full list of possible parameters that you
    // can add see:
    //   https://cloudinary.com/documentation/upload_widget_reference

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        // multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
        styles: {
            palette: {
                window: "#F5F5F5",
                sourceBg: "#FFFFFF",
                windowBorder: "#90a0b3",
                tabIcon: "#0094c7",
                inactiveTabIcon: "#69778A",
                menuIcons: "#0094C7",
                link: "#53ad9d",
                action: "#8F5DA5",
                inProgress: "#0194c7",
                complete: "#53ad9d",
                error: "#c43737",
                textDark: "#000000",
                textLight: "#FFFFFF"
            },
            fonts: {
                default: null,
                "'Poppins', sans-serif": {
                    url: "https://fonts.googleapis.com/css?family=Poppins",
                    active: true
                }
            }
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
            setImage(result.info.secure_url)
            upload(result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  useEffect(() => {
    init()
  }, [])

    return (
        <button id="upload_widget" className="cloudinary-button">
        Upload
        </button>
    );
}

export default UploadImage;
