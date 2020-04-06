import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import routes from './config/routes';
import toJson from 'enzyme-to-json';


describe('App', ()=>{

  const wrapper = shallow(<App />);

  it('should match snapshot', ()=>{
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have N route(s)', () => {
    expect(wrapper.find('Route')).toHaveLength(routes.length);
  });
});
