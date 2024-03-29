﻿import * as React from 'react';

export class Footer extends React.Component<{}, undefined> {
    render() {
        return (
            <footer className="footer text-center">
                <div className="container">
                    <hr />
                    <p className="text-muted">
                        Cardpeak &copy; 2023 v{__VERSION__}
                    </p>
                </div>
            </footer>
        );
    }
}
