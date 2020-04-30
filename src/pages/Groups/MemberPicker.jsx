import React, { useState, useEffect } from 'react';

import { Modal, Checkbox, Button, Select } from 'antd';
import { SearchInput } from '../../components/custom';

import * as api from '../../api';

import './MemberPicker.css';

const Option = Select.Option;

const MemberPickerContainer = ({ availableMembers, onPicked }) => {
    const [ isVisible, setVisibility ] = useState(false);
    const toggle = () => setVisibility(!isVisible);
    const handlePicked = (memberPicked) => {
        toggle();
        onPicked(memberPicked);
    }

    return (
        <React.Fragment>
            <Button type="primary" onClick={toggle}>Ajouter des membres</Button>
            <MemberPicker
                availableMembers={availableMembers}
                visible={isVisible}
                onClose={toggle}
                onPicked={handlePicked}
            />
        </React.Fragment>
    );
}

const MemberPicker = ({ availableMembers, visible, onClose, onPicked }) => {
    const [ count, setCount ] = useState(0);
    const [ checkedMembers, setCheckedMembers ] = useState([]);
    const [ members, setMembers ] = useState([]);
    const [ filteredMembers, setFilteredMembers ] = useState([]);
    const [ filter, setFilter ] = useState({
        search: undefined,
        rank: undefined,
    });
    const [ ranks, setRanks ] = useState([]);

    useEffect(() => {
        api.Ranks.all()
            .then(ranks => {
                ranks.unshift({
                    name: 'Tous les rangs',
                    id: null
                });
                setRanks(ranks);
            });
    }, []);

    useEffect(() => {
        setMembers(availableMembers);
        setFilteredMembers(availableMembers);
    });

    useEffect(() => {
        setFilteredMembers(members.filter(member => {
            if (filter.search && (! (`${member.profile.firstName} ${member.profile.lastName}`).toLowerCase().includes(filter.search.toLowerCase())))
                return false;
            if (filter.rank && filter.rank !== member.rank.id)
                return false;
            return true;
        }));
    }, [filter]);

    const handlePicked = () => {
        const memberPicked = checkedMembers.map((member, index) => {
            var memberItem = {
                member,
                id: count - index - 1
            }
            return memberItem;
        });
        onPicked(memberPicked);
        setCheckedMembers([]);
        setCount(count + memberPicked.length);
    }

    const handleChecked = (member) => (checked) => {
        setCheckedMembers(checked ?
            checkedMembers.concat([member]) :
            checkedMembers.filter(mem => mem !== member)
        );
    }

    const renderSelectedMembersInfo = () => {
        const count = checkedMembers.length;
        if (count === 0)
            return "Aucune sélection"
        return `${count} membre${count > 1 ? 's' : ''} sélectionné${count > 1 ? 's' : ''}`;
    }

    const handleFilterChange = (filterName) => (value) => {
        const data = {...filter};
        data[filterName] = value;
        setFilter(data);
    }

    return (
        <Modal
            visible={visible}
            onOk={handlePicked}
            onCancel={onClose}
            title="Sélection de membres"
            footer={[
                <Button key="back" onClick={onClose} className="back">Retour</Button>,
                <span className="selected-info" key="info">
                    {renderSelectedMembersInfo()}
                </span>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handlePicked}
                    disabled={checkedMembers.length < 1}
                >
                    Ajouter
                </Button>,
            ]}
            className="MemberPicker"
        >
            <div className="filters">
                <Select
                    defaultValue="Tous les rangs"
                    className="select"
                    onChange={handleFilterChange('rank')}
                >
                    {ranks.map((rank, index) =>
                        <Option value={rank.id} key={rank.id}>{rank.name}</Option>
                    )}
                </Select>
                <SearchInput
                    onSearch={handleFilterChange('search')}
                    placeholder="Rechercher par nom"
                />
            </div>

            <div className="members">
                {filteredMembers.map((member, index) =>
                    <Member
                        member={member}
                        checked={checkedMembers.includes(member)}
                        onChecked={handleChecked(member)}
                        key={index}
                    />
                )}
            </div>
        </Modal>
    )
}


const Member = ({ member, checked, onChecked }) => {
    const handleChecked = () => onChecked(!checked);

    return(
        <div className="Member" onClick={handleChecked}>

            <Checkbox
                checked={checked}
                onChange={handleChecked}
                className="checkbox"
            />
            <span className="title">{`${member.profile.firstName} ${member.profile.lastName}`}</span>
            <div className="rankContainer">
                <span className="rank">{member.rank.name}</span>
                <img className="image" src={member.rank.image} alt="memberRankImage" />
            </div>
        </div>
    )
}

export default MemberPickerContainer;
