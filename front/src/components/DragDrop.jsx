import { post } from '../utils/http'
import './DragDrop.scss'

const DragDrop = ({ setFoto, setSrcImagen, srcImagen }) => {

  // !  Cancelando comportamiento por defecto del navegador

  const arrayEventos = ['dragenter', 'dragleave', 'dragover', 'drop']

  arrayEventos.forEach(eventName => {
    document.body.addEventListener(eventName, e => e.preventDefault())
  })

  const handleEnter = () => {
    console.log('Una imagen ingreso a la zona de drop')
  }

  const handleOver = () => {
    console.log('Estoy sobre la zona de drop')
  }

  const handleDrop = e => {
    //console.log(e)
    const dataTransf = e.dataTransfer
    const files = dataTransf.files
    handleFiles(files)
  }

  const handleChange = e => {
    //console.log(e)
    //console.log(e.target.files)
    const files = e.target.files 
    handleFiles(files)
  }

  const handleFiles = async files => {
    // console.log('llegaron las imagens', files)
    try {
        const file = files[0]
        await uploadFile(file)
        previewFile(file)
    } catch (error) {
        console.error('[handleFiles]:', error)
    }
  }

  const previewFile = file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.addEventListener('loadend', () => {
        setSrcImagen(reader.result)
    })

  }

  const uploadFile = async file => {
    const formData = new FormData()

    try {
        formData.append('foto', file)
        const imagenUp = await post('http://localhost:8080/api/upload', formData)
        setFoto(imagenUp)
    } catch (error) {
        console.error('[uploadFile]:', error)
    }
  }

  return (
    <div className="drop-area" onDrop={handleDrop} onDragEnter={handleEnter} onDragOver={handleOver}>
        <p>Subir imagen al servidor <b>file dialog</b> o con <b>drag and drop</b> dentro del area punteada</p>

        <input type="file" id="lbl-foto" accept='image/*' onChange={handleChange}/>
        <label htmlFor="lbl-foto" className='drop-area-button'>
            File Dialog
        </label>

        <div className="drop-area-image">
            <img src={srcImagen} alt="" />
        </div>

    </div>
  )
}

export default DragDrop