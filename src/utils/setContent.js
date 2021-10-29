import Spinner from '../components/spinner/Spinnner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting': {
            return <Spinner/>
            }
        case 'loading': {
            return <Spinner/>
            }
        case 'confirmed': {
            return <Component data={data}/>
            }
        case 'error': {
            return <ErrorMessage/>
            }
        default:
           return null    
    }           
}

export default setContent;