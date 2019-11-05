exports.contentType =  function(fileType) {
    let content = 'text';
    let type = 'html';
    switch (fileType) {
      case 'js':
        content = 'application';
        type = 'javascript';
        break;
      case 'css':
        type = 'css';
        break;
      case 'png':
        content = 'image';
        type = 'png';
        break;
      case 'jpg':
        content = 'image';
        type = 'jpeg';
        break;
      case 'jpeg':
        content = 'image';
        type = 'jpeg';
        break;
      case 'gif':
        content = 'image';
        type = 'gif';
        break;
      case 'svg':
        content = 'image';
        type = 'svg+xml';
        break;
      case 'mp3':
        content = 'audio';
        type = 'mpeg';
        break;
      case 'mp4':
        content = 'video';
        type = 'mp4';
        break;
      case 'ttf':
        content = 'application';
        type = 'x-font-ttf';
        break;
      default:
        break;
    }
    return `${content}/${type}`;
  }