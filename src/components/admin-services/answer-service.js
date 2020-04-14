import axios from 'axios';

class AnswerCRUD {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
      withCredentials: true,
      useFindAndModify: false //deprecation
    });
    this.service = service;
  }

  getAll = () => {
    return this.service.get('/answer')
    .then(response => response.data.answers)
  }

  getById = id => {
    return this.service.get(`/answer/${id}`)
    .then(response => response.data.answers)
  }

createAnswer = answerBody => {
    return this.service.post('/answer', answerBody)
    .then(response => response.data)
  }

  delete = (id) => {
    return this.service.delete(`/answer/${id}`)
    .then(response => response.data)
  }
}

export default AnswerCRUD;