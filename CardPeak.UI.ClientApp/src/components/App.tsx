import * as React from 'react'
import { NavigationBar, Footer } from './layout'

export class App extends React.Component<{}, undefined>{
    render() {
        return (
            <div>
                <NavigationBar />
                <div id="content" className="container">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}