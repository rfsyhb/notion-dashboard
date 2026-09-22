import 'server-only';

import { notion } from './client';

export async function uploadFileToNotion(file: File) {
  // 1. File upload object
  const fileUpload = await notion.fileUploads.create({
    mode: 'single_part',
    filename: file.name,
    content_type: file.type,
  });

  // 2. Kirim binary file ke Notion
  const uploadedFile = await notion.fileUploads.send({
    file_upload_id: fileUpload.id,
    file: {
      filename: file.name,
      data: file,
    },
  });

  return uploadedFile;
}
