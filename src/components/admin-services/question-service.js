import axios from 'axios';

class QuestionCRUD {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
      withCredentials: true
    });
    this.service = service;
  }

  getAll = () => {
    return this.service.get('/questions')
    .then(response => response.data.questions)
  }

  getByBranch = branch => {
    return this.service.get(`/questions/${branch}`)
    .then(response => response.data)
  }

createQuestion = questionBody => {
    return this.service.post('/questions', questionBody)
    .then(response => response.data)
  }
}

export default QuestionCRUD;