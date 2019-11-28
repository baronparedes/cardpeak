import * as React from 'react'
import { withRouter, RouteProps } from 'react-router-dom'

type Props = {
    children: JSX.Element
}

class ScrollToTop extends React.Component<RouteProps & Props> {
    componentDidUpdate(prevProps: RouteProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);