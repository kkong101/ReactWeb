import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {CopyOutlined} from '@ant-design/icons';
import axios from 'axios'

function FileUpload(props) {

    const [Images, setImages] = useState([])



    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header: { 'content-type' :  'multipart/fomr-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/product/image',formData ,config )
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setImages([...Images,response.data.filePath])
                    props.refreshFunction([...Images,response.data.filePath])

                } else {
                    alert('파일을 저장하는데 실패하였습니다.')
                }
            }) 
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images];
        newImages.splice(currentIndex,1);
        setImages(newImages);
        props.refreshFunction(newImages);

    }

    return (
        <div style= {{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                { ({getRootProps,getInputProps}) => (
                    <section>
                        <div style={{width:300, height: 240, border: '1px solid lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <CopyOutlined style={{ fontSize: '2rem' }}/>

                        </div>
                    </section>
                )}
            </Dropzone>
            <div style ={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
                {Images.map( (image,index) => (
                        <div onClick={() => { deleteHandler(image) }} key={index}>
                            <img style={{minWidth: '300px', width:'310px', height: '230px'}} src={`http://localhost:5000/${image}`} />
                        </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload