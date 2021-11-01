import Spinner from '../components/spinner/Spinnner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (process, Component, data, dataType=null) => {
    switch (process) {
        case 'waiting': {
            return <Spinner/>
            }
        case 'loading': {
            return <Spinner/>
            }
        case 'confirmed': {
            return <Component data={data}
                              dataType={dataType}/>
            }
        case 'error': {
            return <ErrorMessage/>
            }
        default:
           return null    
    }           
}

export default setContent;