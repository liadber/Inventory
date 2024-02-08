import React from 'react';
import EnhancedTable from "./components/table/Table";
import "./App.scss";
import Section from "./components/section/Section";

function App() {

    return (
        <>
            <Section>
                <EnhancedTable></EnhancedTable>
            </Section>
            <Section className='app-section'>
                <EnhancedTable></EnhancedTable>
            </Section>
            {/*<Grid item>*/}
            {/*    <EnhancedTable></EnhancedTable>*/}
            {/*</Grid>*/}
            {/*<Grid item>*/}
            {/*    <EnhancedTable></EnhancedTable>*/}
            {/*</Grid>*/}
            {/*<PermanentDrawerLeft></PermanentDrawerLeft>*/}
        </>
    );
}

export default App;
