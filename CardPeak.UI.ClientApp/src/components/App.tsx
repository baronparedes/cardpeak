import * as React from 'react'
import { NavigationBar } from './layout/NavigationBar'
import { Footer } from './layout/Footer'

export class App extends React.Component<{}, undefined>{
    render() {
        return (
            <div>
                <NavigationBar />
                <div id="content" className="container no-padding">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}