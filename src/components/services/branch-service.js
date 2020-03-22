import axios from 'axios';

class BranchCRUD {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
      withCredentials: true
    });
    this.service = service;
  }

  getAll = () => {
    return this.service.get('/branch')
    .then(response => response.data.branches)
  }

  createBranch = branchBody => {
    return this.service.post('/branch', branchBody)
    .then(response => response.data)
  }
}

export default BranchCRUD;