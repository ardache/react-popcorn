import axios from 'axios';

class AnswerCRUD {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
      withCredentials: true
    });
    this.service = service;
  }

  getAll = () => {
    return this.service.get('/answer')
    .then(response => response.data.answers)
  }

  getById = num => {
    return this.service.get(`/answer/${num}`)
    .then(response => response.data)
    .then(console.log(num))
  }

  createQuestion = answerBody => {
    return this.service.post('/answer', answerBody)
    .then(response => response.data)
  }
}

export default AnswerCRUD;