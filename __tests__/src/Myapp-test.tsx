
import React from 'react'
import { renderWithRedux } from '../../helpers/testHelper/renderWithRedux';
import MyApp from '../../src/page/myapp';


describe('initial MyApp', ()=>{
    it('render redux', ()=>{
        renderWithRedux(<MyApp/>)
    })

    it('get Widget MyApp', ()=>{
        const {getByTestId} = renderWithRedux(<MyApp/>)

        const idMyApp = getByTestId("MyAppID");
        expect(idMyApp).not.toBeNull()
        
        const idRefreshButton = getByTestId("idRefreshButton");
        expect(idRefreshButton).not.toBeNull()
    })
})