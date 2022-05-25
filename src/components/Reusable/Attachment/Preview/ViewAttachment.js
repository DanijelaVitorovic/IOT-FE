import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

class ViewAttachment extends Component {
  state = {
    limitToBounds: true,
    panningEnabled: true,
    transformEnabled: true,
    pinchEnabled: true,
    limitToWrapper: false,
    disabled: false,
    dbClickEnabled: true,
    lockAxisX: false,
    lockAxisY: false,
    velocityEqualToMove: true,
    enableWheel: true,
    enableTouchPadPinch: true,
    enableVelocity: true,
    limitsOnWheel: false,
  };

  render() {
    let url;
    if (this.props.content) {
      const data = b64ToBlob(this.props.content);
      url = URL.createObjectURL(data);
    } else {
      return <div></div>;
    }

    window.addEventListener(
      'click',
      (e) => {
        URL.revokeObjectURL(url);
      },
      { once: true }
    );

    const {
      limitToBounds,
      panningEnabled,
      transformEnabled,
      pinchEnabled,
      limitToWrapper,
      disabled,
      dbClickEnabled,
      lockAxisX,
      lockAxisY,
      velocityEqualToMove,
      enableWheel,
      enableTouchPadPinch,
      enableVelocity,
      limitsOnWheel,
    } = this.state;

    return (
      <div className="attachment-wrapper m-auto" style={{ border: 'solid' }}>
        <TransformWrapper
          options={{
            limitToBounds,
            transformEnabled,
            disabled,
            limitToWrapper,
          }}
          pan={{
            disabled: !panningEnabled,
            lockAxisX,
            lockAxisY,
            velocityEqualToMove,
            velocity: enableVelocity,
          }}
          pinch={{ disabled: !pinchEnabled }}
          doubleClick={{ disabled: !dbClickEnabled }}
          wheel={{
            wheelEnabled: enableWheel,
            touchPadEnabled: enableTouchPadPinch,
            limitsOnWheel,
          }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <React.Fragment>
              <div className="tools">
                <div className="spacer" />
                <button
                  className="tools-button btn"
                  onClick={zoomIn}
                  data-testid="zoom-in-button"
                >
                  <ZoomInIcon />
                </button>
                <button
                  className="tools-button btn"
                  onClick={zoomOut}
                  data-testid="zoom-out-button"
                >
                  <ZoomOutIcon />
                </button>
                <button
                  className="tools-button btn"
                  onClick={resetTransform}
                  data-testid="reset-button"
                >
                  <ZoomOutMapIcon />
                </button>
              </div>
              <div className="element">
                <TransformComponent>
                  <FileViewer
                    fileType={this.props.fileType}
                    filePath={url}
                    errorComponent={CustomErrorComponent}
                    onError={(e) => console.log('error', e)}
                    unsupportedComponent={UnsupportedComponent}
                  />
                </TransformComponent>
              </div>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    );
  }
}

export default ViewAttachment;

class CustomErrorComponent extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return <div>Дошло је до грешке!</div>;
  }
}

class UnsupportedComponent extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    //TODO - dodati prevod u translate za sve u ovoj komponenti
    return <div>Дошло је до грешке</div>;
  }
}

function b64ToBlob(b64) {
  const byteCharacters = atob(b64);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray]);
  return blob;
}
