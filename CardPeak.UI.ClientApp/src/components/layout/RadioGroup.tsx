import * as React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

interface RadioGroupProps {
    name: string,
    onChange?: (e: any) => void,
    options: string[][],
    value: string,
}

export const RadioGroup: React.StatelessComponent<RadioGroupProps> = (props) => {
    return (
        <ButtonGroup>
            {props.options.map(option =>
                <Button
                    key={option[0]}
                    bsStyle={option[0] === props.value ? 'primary' : 'default'}
                    children={option[1]}
                    name={props.name}
                    onClick={props.onChange}
                    value={option[0]}
                />
            )}
        </ButtonGroup>
    )
}