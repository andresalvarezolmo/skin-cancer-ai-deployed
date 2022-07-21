import React, { Component } from 'react';

class Webcam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HEIGHT: 500,
            WIDTH: 500,
            cameras: [],
            cameraIndex: 1,
            playing: false,
            prueba: "W"
        }
    }

    componentDidMount() {
        this.assignCameras()
    }
    
    assignCameras = () => {
        
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            // Only save devices with camera
            let devicesWithCamera = []
            devices.forEach((device, index) => {
                if (device.kind === "videoinput") { 
                    devicesWithCamera.push(device.deviceId)
                }
            })
            this.setState({
                cameras: devicesWithCamera
            })
        })
    }

    //Async switch camera function, waits for the state change before restarting the video, otherwise sometimes the change does not get applied  
    switchCamera = async () => {
        await this.setState({
            cameraIndex: (this.state.cameraIndex + 1) % (this.state.cameras.length)
        }, () => { console.log("Camera changed", this.state.cameraIndex) })
        this.stopVideo()
        this.startVideo()

    }

    startVideo = () => {
        this.setState({
            playing: true
        });
        navigator.getUserMedia(
            {
                video: { deviceId: this.state.cameras[this.state.cameraIndex] }
            },
            (stream) => {
                let video = document.getElementsByClassName('app__videoFeed')[0];
                if (video) {
                    video.srcObject = stream;
                }
            },
            (err) => console.error(err)

        );        
    };

    stopVideo = () => {
        this.setState({
            playing: false
        });
        let video = document.getElementsByClassName('app__videoFeed')[0];
        video.srcObject.getTracks()[0].stop();
    };

    render() {
        return (
            <div className="app">
                <div className="app__container">
                    <video
                        height={this.state.HEIGHT}
                        width={this.state.WIDTH}
                        muted
                        autoPlay
                        className="app__videoFeed"
                    ></video>
                </div>
                <div className="app__input">
                    {this.state.playing ? (
                        <button onClick={this.stopVideo}>Stop</button>
                    ) : (
                        <button onClick={this.startVideo}>Start</button>
                    )}
                </div>
                <div className='app__camera'>
                    <button onClick={this.switchCamera}>Change Camera</button>
                    <p>{this.listCameras}</p>
                </div>             
            </div>
        );
    }
}

export default Webcam;