import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';

const onMenuClickFn = jest.fn();

describe('Header', ()=>{

    const wrapper = mount(<Header title="Web Inventory Application" onMenuClick={onMenuClickFn} />);

    it('title should match', ()=>{
        expect(wrapper.find('h6#title-label'))
        .toHaveText('Web Inventory Application');
    });

    it('menu should have been clicked', ()=>{
        wrapper.find('button#menu-button').simulate('click');
       expect(onMenuClickFn).toHaveBeenCalled();
    });

    it('menu should have been clicked twice', ()=>{
        wrapper.find('button#menu-button')
        .simulate('click')
        .simulate('click');
        expect(onMenuClickFn).toHaveBeenCalledTimes(3);
    });
});