import * as React from 'react'

export const ButtonLoadingText = (props: { isLoading: boolean, label: React.ReactNode}) => {
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
