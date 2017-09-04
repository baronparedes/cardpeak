import * as React from 'react'
import { Button } from 'react-bootstrap'

interface ButtonLoadingProps {
    bsStyle?: string,
    onClick?: () => void,
    isLoading: boolean,
    label: React.ReactNode,
    className?: string;
}

export const ButtonLoadingText = (props: { isLoading: boolean, label: React.ReactNode }) => {
    if (props.isLoading) {
        return (
            <div>
                <span className="spacer-right">Loading..</span>
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        )
    }
    return (
        <div>
            {props.label}
        </div>
    )
}

export const ButtonLoading = (props: ButtonLoadingProps) => {
    return (
        <Button
            type="button"
            className={props.className}
            bsStyle={props.bsStyle}
            onClick={props.onClick}
            disabled={props.isLoading}>
            <ButtonLoadingText isLoading={props.isLoading} label={props.label} />
        </Button>
    )
}