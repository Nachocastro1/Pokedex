import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { PokemonContext } from '../context/PokemonContext';

export const Navigation = () => {
  const { onInputChange, valueSearch, onResetForm } = useContext(PokemonContext);
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/search', {
      state: valueSearch,
    });

    onResetForm();
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container className='fluid w-100 d-flex justify-content-between align-items-center'>
          <Navbar.Brand href="/HomePage">
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/2094/2094510.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' '}
            Pokédex
          </Navbar.Brand>
          <form onSubmit={onSearchSubmit} className="w-auto">
            <InputGroup>
              <FormControl
                type='search'
                name='valueSearch'
                id=''
                value={valueSearch}
                onChange={onInputChange}
                placeholder='Buscar nombre de pokemon'
              />
              <Button variant="outline-secondary btn-search" type="submit">Buscar</Button>
            </InputGroup>
          </form>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Navigation;
