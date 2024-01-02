import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Select, { ActionMeta, MultiValue } from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface Props {
    onDismiss: () => void;
    options: Option[];
    handleSave: (values: string[]) => void;
}

const MultiSelectModal = ({ handleSave, options, onDismiss }: Props) => {

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const handleSelectChange = (values: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {    
        setSelectedOptions(Array.from(values));
        console.log(selectedOptions.map(val => val.value))
    };


    return (
        <Modal show={true} onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Select Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Select
                    options={options}
                    isMulti
                    value={selectedOptions}
                    onChange={handleSelectChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={()=>handleSave(selectedOptions.map(val => val.value))}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MultiSelectModal