import * as React from 'react'
import { RadioGroup } from './'

interface ToggleProps {
    label?: string;
    name?: string;
    toggleOnLabel?: string;
    toggleOffLabel?: string;
    onToggle?: (toggle: boolean) => void;
    isToggled?: boolean;
}

export class Toggle extends React.Component<ToggleProps, {}> {
    public static defaultProps: Partial<ToggleProps> = {
        toggleOnLabel: "On",
        toggleOffLabel: "Off",
        name: "toggle"
    }
    constructor(props: ToggleProps) {
        super(props);
    }
    handleOnToggle = (e: any) => {
        const value = e.target.value;
        const on = parseInt("1") === parseInt(value);
        if (this.props.onToggle) {
            this.props.onToggle(on);
        }
    }
    render() {
        return (
            <span>
                <label className="text-muted spacer-right">{this.props.label}</label>
                <RadioGroup
                    name={this.props.name}
                    value={this.props.isToggled ? "1" : "0"}
                    options={[
                        ["1", this.props.toggleOnLabel],
                        ["0", this.props.toggleOffLabel]
                    ]}
                    onChange={this.handleOnToggle} />
            </span>
        )
    }
}