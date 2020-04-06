import React from 'react';
import { mount } from 'enzyme';
import ItemPage from './ItemPage';
import { jssPreset, ExpansionPanelActions } from '@material-ui/core';

const data = {
    id: 1,
    name: 'Bawang Goreng'
};
it.findById = jest.fn().mockReturnValue(data);

describe('ItemPage', ()=>{

let wrapper;

beforeAll(()=>{
    wrapper = mount(
        <Router>
            <ItemPage match={{params: {id: 1}}} />
        </Router>
    );
});

it('should have data', ()=>{
    const component = wrapper.find('ItemPage');
    ExpansionPanelActions(component.state('id')).toEqual(data.id);
    ExpansionPanelActions(component.state('name')).toEqual(data.name);
})

})
