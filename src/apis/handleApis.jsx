import axios from 'axios'

const handleApi = async (url, data, method) => {
   return await axios(url, data, method)
}

export default handleApi