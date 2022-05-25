import { allowedFileFormats, uploadFileMaxSize } from './constants/globals';

export const returnFileFormat = (documentType) => {
  let format = documentType.substring(
    documentType.lastIndexOf('/') + 1,
    documentType.length
  );
  return format;
};

export const checkFileFormat = (files) => {
  for (let i = 0; i < files.length; i++) {
    let format = returnFileFormat(files[i].type);
    if (!allowedFileFormats.includes(format)) {
      return true;
    }
  }
  return false;
};

export const checkFilesSize = (files) => {
  let size = 0;
  for (let i = 0; i < files.length; i++) {
    size += files[i].size;
  }
  return size > uploadFileMaxSize;
};

export const getFilesForUpload = (files) => {
  const arrayLength = files.length;
  if (arrayLength !== 0) {
    let uploadedArray = [];
    for (let i = 0; i < arrayLength; i++) {
      uploadedArray.push(files[i]);
    }
    return uploadedArray;
  } else {
    return null;
  }
};
