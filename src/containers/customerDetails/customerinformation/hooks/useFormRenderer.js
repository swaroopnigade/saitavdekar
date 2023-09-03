import Col from 'react-bootstrap/Col';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Select from '../../../../components/Select';
import FileUpload from '../../../../components/FileUpload';

const useFormRenderer = (props) => {
    const {formData, errorData} = {...props};
    const renderInputBox = (item, index, handleInputChange) => {
        const {className, id, label, placeholder, inputType, type, name, disabled, size} = {...item}
        return(
          <Col sm={size} key={`${index}`}>
            <Input 
              className={className} 
              id={id} 
              label={label} 
              placeholder={placeholder} 
              inputType={inputType}
              type={type}
              onChange={handleInputChange}
              name={name}
              value={formData[name]}
              formErrorData={errorData}
              disabled={disabled}
            />
          </Col>
        ) 
    }
    const renderTextArea = (item, index, handleInputChange) => {
        const {className, id, label, placeholder, inputType, type, name, disabled, size} = {...item}
        return(
            <Col sm={size} key={`${index}`}>
            <TextArea 
                className={className} 
                id={id} 
                label={label} 
                placeholder={placeholder} 
                inputType={inputType}
                type={type}
                onChange={handleInputChange}
                name={name}
                value={formData[name]}
                formErrorData={errorData}
                disabled={disabled}
            />
            </Col>
        ) 
    }
    const renderSelect = (item, index, handleInputChange) => {
        const {className, id, label, placeholder, inputType, type, name, documemtList, disabled, size} = {...item}
        return(
            <Col sm={size} key={`${index}`}>
            <Select 
                className={className} 
                id={id} 
                label={label} 
                placeholder={placeholder} 
                inputType={inputType}
                type={type}
                onChange={handleInputChange}
                name={name}
                value={formData[name]}
                formErrorData={errorData}
                documemtList={documemtList}
                disabled={disabled}
            />
            </Col>
        )
    }
    const renderFileUpload = (item, index, handleInputChange) => {
        const {className, id, label, placeholder, inputType, type, name} = {...item}
        return(
            <Col sm={6} key={`${index}`}>
                <FileUpload 
                    className={className} 
                    id={id} 
                    label={label} 
                    placeholder={placeholder} 
                    inputType={inputType}
                    type={type}
                    onChange={handleInputChange}
                    name={name}
                    formErrorData={errorData}
                />
            </Col>
        )
    }

    return{
        renderInputBox,
        renderTextArea,
        renderSelect,
        renderFileUpload
    }
}

export default useFormRenderer