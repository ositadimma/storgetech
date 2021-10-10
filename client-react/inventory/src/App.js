import './App.css';
import React from 'react'
import Items from './components/Items';
import Category from './components/Category';
import Users from './components/Users';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styled from "styled-components";
import Login from './components/Login';
import Register from './components/Register'
import { Component } from 'react';


const Pages= styled.div`
  width: 100vw;
  height: 93vh;
  display: flex;
  flex: 100%;
`
const values={
  name: '',
  category:''
}


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      users: [],
      itemData: [],
      openPopup: false,
      categories: [],
      values: values,
      userData:{},
      page: 0,
      rowsPerPage: 5,
      categoryNameInput: '',
      nameInput: '',
      errors:[],
      recordForEdit: [],
    }
  }

  
  getUsers(){
    var self= this;
    axios.get('http://localhost:9000/user/api/v1/inventory/users')
    .then(function(response){
      self.setState({
        users: response.data
      })
    }).catch((err)=>{
      throw err;
    })
  }
  
  
  getItems(){
    var self= this;
    axios.get('http://localhost:9000/item/api/v1/inventory/item')
    .then(function(response){
      self.setState({
        itemData: response.data
      })
    }).catch((err)=>{
      throw err;
    })
  }

  getCategories(){
    var self= this;
    axios.get('http://localhost:9000/item/api/v1/inventory/item_category')
    .then(function(response){
      self.setState({
        categories: response.data
      })
    }).catch((err)=>{
      throw err;
    })
  }

  setUserData(userData){
    this.setState({
      userData: userData
    })
  }

  setDefaultCategory(){
    this.setState(
      {
        ...this.state,
        category: this.state.categories[0]
      }
    )
  }

  componentDidMount(){
    this.getUsers();
    this.getItems();
    this.getCategories();
    this.setDefaultCategory();
    this.setUserData(this.state.userData);
    console.log(this.state.itemData)
  }



  
  render() {
    const handleInputChange= (event)=>{
      const name=event.target.name
      const value= event.target.value
      this.setState(
        {
          ...this.state,
          [name]: value
        }
      )
    }
    
    

    const openInCategoryPopup=(category)=>{
      this.setState(
        {
          ...this.state,
          recordForEdit: category,
          openPopup: true
        }
      )
    }


    

    const validateCategory=()=>{
      let temp= {};
      temp.categoryNameInput= this.state.categoryNameInput?"":"This field is required";
      this.setState(
        {
          ...this.state,
          errors: temp
        }
      )
      return Object.values(temp).every(x=>x=="")
    }

    const validate=()=>{
      let temp= {};
      temp.nameInput= this.state.nameInput?"":"This field is required";
      this.setState(
        {
          ...this.state,
          errors: temp
        }
      )
      return Object.values(temp).every(x=>x=="")
    }

    const handlePageChange=(event, newPage)=>{
      this.setState({
        page: newPage
      })
    }

    const handleChangeRowsPerPage=(event)=>{
      this.setState({
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0
      })
    }

    const resetCategoryForm=()=>{
      this.setState(
        {
          ...this.state,
          errors: [],
          categoryNameInput: ''
        }
      )
    }
    
    const handleItemSubmit=(e)=>{
      e.preventDefault()
      if(validate()){
        var impu= this.state.nameInput
        var cate= this.state.category

        axios.post(
          'http://localhost:9000/item/api/v1/inventory/item', 
          {
            name: impu, 
            category: cate
          }
        )
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        this.setState(
          {
            ...this.state,
            openPopup: false
          }
        )
      }
    }


    const handleCategorySubmit=(e)=>{
      e.preventDefault()
      if(validateCategory()){
       
        var impute= this.state.categoryNameInput

        console.log(impute)

        axios.post(
          'http://localhost:9000/item/api/v1/inventory/item_category', 
          {
            name: impute
          }
        )
        .then(res=>{
          resetCategoryForm()
          this.getCategories();
          console.log(res)
        })
        .catch(err=>console.log(err))
        this.setState(
          {
            ...this.state,
            openPopup: false
          }
        )
        
       
      }
    }

    const NavRoute=({exact, userData, path, component: Component})=>(
      <Route exact={exact} path={path} render={(props)=>(
        <div>
          <Component {...props}/>
        </div>
      )}/>
    )

    let userData= this.state.userData;
    if(!userData){
      return null;
    }

    return (
      <Router>
        <div className="App"> 
        <Switch>
        <Route exact path='/' render={()=><Login userData={this.state.userData} setUserData={this.setUserData.bind(this)}/>}/>
        <Route path='/Register' render={()=><Register/>}/>  
        <Route>
          <Navbar/>
          <Pages>
            <Sidebar/>
              <Route path='/dashboard'>
                <Dashboard
                  users={this.state.users}
                  categories={this.state.categories}
                  items={this.state.itemData}
                />
              </Route>
              <Route path='/users'>
                <Users
                  users={this.state.users}
                />
              </Route>
              <Route path='/category'>
                  <Category 
                    getCategories={()=>{this.getCategories()}} 
                    categories={this.state.categories}
                    handleInputChange={handleInputChange}  
                    categoryNameInput={this.state.categoryNameInput}
                    handleSubmit={handleCategorySubmit}
                    errors={this.state.errors}
                    openPopup={this.state.openPopup}
                    openInPopup={openInCategoryPopup}
                    recordForEdit={this.state.recordForEdit}
                    handlePageChange={()=>handlePageChange()}
                    handleChangeRowsPerPage={()=>handleChangeRowsPerPage()}
                  />
              </Route>
              <Route path='/items'>
                  <Items 
                    getItems={()=>{this.getItems()}}
                    items={this.state.itemData} 
                    handleInputChange={handleInputChange}  
                    nameInput={this.state.nameInput}
                    categories={this.state.categories}
                    handleSubmit={handleItemSubmit}
                    errors={this.state.errors}
                    openPopup={this.state.openPopup}
                    recordForEdit={this.state.recordForEdit}
                  />
              </Route>
          </Pages>
          </Route>
          </Switch>
        </div>
      </Router>
      
    );
  }
}



export default App;

