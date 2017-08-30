import * as React from 'react'

interface HighlightedSpanProps {
    className?: string;
    value: any
}

interface HighlightedSpanState {
    valueChanged: boolean
}

export class HighlightedSpan extends React.Component<HighlightedSpanProps, HighlightedSpanState> {
    controls: {
        highlightedSpan?: HTMLSpanElement;
    } = {};
    constructor(props: HighlightedSpanProps) {
        super(props);
        this.state = {
            valueChanged: false
        }
    }
    componentWillReceiveProps(nextProps: HighlightedSpanProps) {
        if (this.props.value != nextProps.value) {
            this.setState({ valueChanged: true });
        }
    }
    componentDidUpdate() {
        if (this.state.valueChanged) {
            let classNames = this.props.className ? this.props.className : "";
            this.controls.highlightedSpan.className = (this.state.valueChanged ? "text-highlight " : "") + classNames
            setTimeout(() => {
                this.controls.highlightedSpan.className = classNames;
            }, 2000);
            this.setState({ valueChanged: false });
        }
    }
    render() {
        let classNames = this.props.className ? this.props.className : "";
        return (
            <span
                ref={(span) => this.controls.highlightedSpan = span}
                className={classNames}>
                {this.props.value}
            </span>
        )
    }
}