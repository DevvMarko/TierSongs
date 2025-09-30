import { useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import styles from './FileDropzone.module.css';

function Basic(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  useEffect(() => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        try {
          const text = reader.result;
          let parsed = JSON.parse(text);
          parsed = parsed.flat(); // flatten the array if nested
          props.setJsonArray(parsed);
          props.toggleDisplay(false);
        } catch (err) {
          console.error('Failed to parse JSON from dropped file:', file.name, err);
        }
      };
      reader.readAsText(file);
    });
    // run only when acceptedFiles array or handler changes
  }, [acceptedFiles]);


  return (
    <section className={styles.fileDropWindow}>

      <div className={styles.fileDropContainer}>
        <div className={styles.header}>
          <h2>Upload data</h2>
          <button onClick={() => props.toggleDisplay(false)}>X</button>
        </div>
        <br />
        <div {...getRootProps({className: 'dropzone'})} className={styles.dropzone}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    </section>
  );
}

export default Basic;