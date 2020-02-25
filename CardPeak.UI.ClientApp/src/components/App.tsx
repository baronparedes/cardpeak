import * as React from 'react';
import { Footer, NavigationBar } from './layout';

export class App extends React.Component<{}, undefined> {
    render() {
        return (
            <div>
                <NavigationBar />
                <div id="content" className="container">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
