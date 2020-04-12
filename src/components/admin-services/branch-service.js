import axios from 'axios';

class BranchCRUD {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
      withCredentials: true,
      useFindAndModify: false //deprecation
    });
    this.service = service;
  }

  getAll = () => {
    return this.service.get('/branch')
    .then(response => response.data.branches)
  }

delete = (id, quesId) => {
  return this.service.delete(`/branch/${id,quesId}`)
  .then(response => response.data.branches)
}

edit = (id) => {
  return this.service.edit(`/branch/${id}`)
  .then(response => response.data.branches)
}


//   getById = id => {
//     return this.service.get(`/answer/${id}`)
//     .then(response => response.data.answers)
//   }

createBranch = branchBody => {
    return this.service.post('/branch', branchBody)
    .then(response => response.data)
  }
}

export default BranchCRUD;