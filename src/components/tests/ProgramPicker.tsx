import React, { FC, useState, useEffect } from 'react';

import { Modal, Checkbox, Button } from 'antd';
import { SearchInput } from '../custom';

import * as api from '../../api';

import './ProgramPicker.css';
import { Program } from '../../types';

const ProgramPickerContainer: FC<{
    onPicked: (program: Program) => void;
    pickedProgram: Program;
}> = ({ onPicked, pickedProgram }) => {
    const [ isVisible, setVisibility] = useState<boolean>(false);
    const toggle = () => setVisibility(!isVisible);
    const handlePicked = (program: Program) => {
        toggle();
        onPicked(program);
    }
    return (
        <React.Fragment>
            <Button onClick={toggle} type="primary">{pickedProgram ? 'Remplacer' : 'Associer un programme'}</Button>
            <ProgramPicker
                visible={isVisible}
                onClose={toggle}
                onPicked={handlePicked}
            />
        </React.Fragment>
    );
}

const ProgramPicker: FC<{
    visible: boolean;
    onClose: () => void;
    onPicked: (program: Program) => void;
}> = ({ visible, onClose, onPicked }) => {
    const [ checkedProgram, setCheckedProgram ] = useState<Program>(undefined);
    const [ programs, setPrograms ] = useState<Array<Program>>([]);
    const [ filteredPrograms, setFilteredPrograms ] = useState<Array<Program>>([]);
    const [ filter, setFilter ] = useState<string>(undefined);
    
    useEffect(() => {
        api.Programs.all()
            .then(programs => {
                setPrograms(programs);
                setFilteredPrograms(programs);
            });
    }, []);

    useEffect(() => {
        setFilteredPrograms(programs.filter(program => 
            !(filter && !program.name.toLowerCase().includes(filter.toLowerCase()))
        ));
    }, [filter]);

    const handlePicked = () => {
        onPicked(checkedProgram);
        setCheckedProgram(undefined);
    }

    const handleChecked = (program: Program) => (checked: boolean) => {
        setCheckedProgram(checked ? program : undefined);
    }

    const renderSelectedProgramInfo = () => {
        if (!checkedProgram)
            return "Aucune sélection"
        return checkedProgram.name;
    }

    return (
        <Modal
            visible={visible}
            onOk={handlePicked}
            onCancel={onClose}
            title="Sélection de programme"
            footer={[
                <Button key="back" onClick={onClose} className="back">Retour</Button>,
                <span className="selected-info" key="info">
                    {renderSelectedProgramInfo()}
                </span>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handlePicked}
                    disabled={!checkedProgram}
                >
                    Ajouter
                </Button>,
            ]}
            className="ProgramPicker"
        >
            <div className="filters">
                <SearchInput
                    onSearch={setFilter}
                    placeholder="Rechercher par nom"
                />
            </div>
            <div className="programs">
                {filteredPrograms.map((program, index) =>
                    <ProgramItem
                        program={program}
                        checked={checkedProgram === program}
                        onChecked={handleChecked(program)}
                        key={index}
                    /> 
                )}
            </div>
        </Modal>
    )
}

const ProgramItem: FC<{
    program: Program;
    checked: boolean;
    onChecked: (checked: boolean) => void;
}> = ({ program, checked, onChecked }) => {
    const handleChecked = () => onChecked(!checked);

    return(
        <div className="ProgramItem" onClick={handleChecked}>
            <Checkbox
                checked={checked}
                onChange={handleChecked}
                className="checkbox"
            />
            <span className="title">{program.name}</span>
            <span className="exercises">{`${program.exercisesScales.length} exercice${program.exercisesScales.length > 1 ? 's' : ''}`}</span>
        </div>
    )
}

export default ProgramPickerContainer;
