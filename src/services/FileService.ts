import { AxiosPromise } from "axios";
import { server } from ".";

const FILE_URI = "v1/files";

export function upload(
  srcId: string,
  fileType: string,
  file: Blob
): AxiosPromise {
  const formData = new FormData();
  formData.append("file", file);
  return server.post(
    `/${FILE_URI}/upload?srcId=${srcId}&fileType=${fileType}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export function batchUpload(
  srcId: string,
  fileType: string,
  files: Blob[]
): AxiosPromise {
  const formData = new FormData();
  files.forEach((f) => {
    formData.append("files", f);
  });
  return server.post(
    `/${FILE_URI}/batch-upload?srcId=${srcId}&fileType=${fileType}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export function getBySrcIdAndFileType(srcId: string, fileType: string) {
  return server.get(`/${FILE_URI}?srcId=${srcId}&fileType=${fileType}`);
}
