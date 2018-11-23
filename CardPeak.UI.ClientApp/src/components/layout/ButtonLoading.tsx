import * as React from 'react'
import { Button } from 'react-bootstrap'

interface ButtonLoadingProps {
	bsStyle?: string;
	bsSize?: ReactBootstrap.Sizes;
	onClick?: () => void;
	isLoading: boolean;
	disabled?: boolean;
	label: React.ReactNode;
	className?: string;
	noText?: boolean;
}

export const ButtonLoadingText = (props: { isLoading: boolean, label: React.ReactNode, noText?: boolean }) => {
	if (props.isLoading) {
		return (
			<div>
				{
					props.noText ? null :
						<span className="spacer-right">Loading...</span>
				}
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
			bsSize={props.bsSize}
			onClick={props.onClick}
			disabled={props.disabled}>
			<ButtonLoadingText isLoading={props.isLoading} label={props.label} noText={props.noText} />
		</Button>
	)
}