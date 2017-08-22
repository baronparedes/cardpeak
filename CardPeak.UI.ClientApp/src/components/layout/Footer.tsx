import * as React from 'react'

export class Footer extends React.Component<{}, undefined> {
    render() {
        return (
            <footer className="footer text-center">
                <div className="container">
                    <p className="text-muted">
                        <hr />
                        Cardpeak 2017
                    </p>
                </div>
            </footer>
        )
    }
}