import * as React from 'react'

export function InjectProps<T>(Component: any, newProps: T) {
    return class extends React.Component {
        constructor(props: any) {
            super(props);
        }
        render() {
            return (
                <Component {...this.props} {...newProps} />
            )
        }
    }
}