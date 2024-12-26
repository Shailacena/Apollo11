import React, { useState } from 'react';
 
const UploadInput = () => {
  const [file, setFile] = useState(null);
 
  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setFile(file);
  };
 
  const uploadFile = async () => {
    if (!file) {
      alert('请选择一个文件');
      return;
    }
 
    const formData = new FormData();
    formData.append('file', file);
 
    try {
      const response = await fetch('YOUR_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('上传成功');
      } else {
        alert('上传失败');
      }
    } catch (error) {
      alert('上传异常');
    }
  };
 
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>上传</button>
    </div>
  );
};
 
export default UploadInput;
