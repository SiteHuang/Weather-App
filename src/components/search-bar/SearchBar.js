import React from 'react';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.domCancel = React.createRef();
  }

  componentDidMount(){
    this.domCancel.current.addEventListener('click', () => {
      console.log(this.domCancel.current);
      this.domCancel.current.previousElementSibling.value = '';
    });
  }

  render(){
    return(
      <div className='search-container'>
        <form>
          <input type='text' placeholder=' ' onInput={e=>console.log(e.target.value)}></input>
          <span ref={this.domCancel}></span>
        </form>
      </div>
    )
  };
};

export default SearchBar;
